import fs from "fs";
import path from "path";

import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";

import ContentConfig from "@/content.config";

import { mergeObjects } from "@/libraries/utilities";

import { DEFAULT_CONTENT_CONFIG } from "@/content/defaults";
import { getFilePathsFromDirectory } from "@/content/utilities/getFilePathsFromDirectory";

/**
 * Parse CMS content to be parsed down in props
 * @description Has usages in `getStaticProps` and `getServerSideProps`
 * @param config
 * @returns the MDX source and metadata
 */
export const parseCMSContent = async <T extends MetaEntry[]>(config: ParseCMSContentConfig<T>) => {
	const { slug, meta } = config;

	const { posts, markdown } = mergeObjects(DEFAULT_CONTENT_CONFIG, ContentConfig);

	if (markdown?.type !== "mdx") { throw new Error("This function only supports parsing MDX"); }

	if (!slug) { return null; }

	const entry = await (async () => {
		if (process.env.NODE_ENV === "development") {
			const entry = meta.find(entry => entry.slug === slug);

			return entry || null;
		}

		const files = await getFilePathsFromDirectory({
			path: path.join(process.cwd(), posts?.postsDir || DEFAULT_CONTENT_CONFIG["posts"].postsDir),
			recursive: true
		});

		const correspondingEntry = files.find(filePath => filePath.includes(slug));

		if (!correspondingEntry) { return null; }

		const postFilePath = path.join(correspondingEntry);
		const source = fs.readFileSync(postFilePath);

		const { content, data } = matter(source);

		return { content, metadata: data };
	})();

	if (!entry) { return null; }

	const source = await serialize(
		entry.content,
		// FIXME fix plugin types
		{
			mdxOptions: {
				remarkPlugins: markdown.plugins?.remarkPlugins as any,
				rehypePlugins: markdown.plugins?.rehypePlugins as any,
			},
			scope: entry.metadata
		}
	);

	return { source, metadata: entry.metadata };
}

type ParseCMSContentConfig<T extends MetaEntry[]> = { slug?: string; meta: T; };

type MetaEntry = {
	slug: string;
	path: string;
	metadata: { [key: string]: unknown };
	content: string;
}

