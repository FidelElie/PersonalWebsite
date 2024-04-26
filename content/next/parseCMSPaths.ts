import path from "path";

import ContentConfig from "@/content.config";

import { mergeObjects } from "@/libraries/utilities";

import { DEFAULT_CONTENT_CONFIG } from "@/content/config";
import { getFilePathsFromDirectory } from "@/content/utilities";

/**
 * Parse CMS content to their corresponding paths
 * @param config
 * @returns array of paths with slug
 */
export const parseCMSPaths = async <T extends MetaEntry[]>(config: ParseCMSPathsConfig<T>) => {
	const { path: filePath, meta } = config;

	const contentConfig = mergeObjects(DEFAULT_CONTENT_CONFIG, ContentConfig);

	if (process.env.NODE_ENV === "development") {
		return meta.map(entry => ({ params: { slug: entry.slug } }));
	}

	const contentPath = path.join(process.cwd(), contentConfig.posts?.postsDir || "", filePath);

	const paths = getFilePathsFromDirectory({
		path: contentPath,
		recursive: true,
		transform: (file) => ({ params: { slug: path.basename(file, path.extname(file)) } })
	});

	return paths;
}

type ParseCMSPathsConfig<T extends MetaEntry[]> = {
	path: string;
	meta: T;
}

type MetaEntry = {
	slug: string;
	path: string;
	metadata: { [key: string]: unknown };
	content: string;
}
