import path from "path";
import fs from "fs/promises";

import matter from "gray-matter";

import { GenericObject } from "@/libraries/types";

import { ContentConfig, PostEntry } from "@/content/types";
import { mergeObjects } from "@/libraries/utilities";
import { DEFAULT_CONTENT_CONFIG, getContentConfig } from "@/content/config";
import {
	contentLogger,
	ensureDirExists,
	getFileName,
	parseContent
} from "@/content/utilities";

/**
 * Interface for interacting with post markdown files
 */
export const PostFile = {
	/**
	 *	Create new post file
	 * @param context
	 */
	new: async function <T extends GenericObject>(
		context: {
			slug: string;
			metadata: T;
			content?: string | string[];
			entry: PostEntry<T>;
			config?: ContentConfig
		}
	) {
		const { metadata, slug, entry, content, config } = context;

		const { posts, markdown } = mergeObjects(
			DEFAULT_CONTENT_CONFIG,
			config || await getContentConfig()
		);

		const parsedPath = await (async () => {
			if (!entry.path) { return null; }

			return typeof entry.path === "string" ? entry.path : entry.path({ slug, metadata });
		})();

		const writePath = path.join(
			posts?.postsDir || DEFAULT_CONTENT_CONFIG.posts.postsDir || "",
			entry.id || "",
			parsedPath || "",
			`${slug}.${markdown?.type || DEFAULT_CONTENT_CONFIG.markdown.type}`
		);

		await ensureDirExists(path.dirname(writePath));

		const validatedMetadata = entry.validator ? await entry.validator(metadata) : metadata;

		const frontmatter = this.parseFrontmatter<T>(validatedMetadata);

		const parsedContent = parseContent(content);

		await fs.writeFile(
			writePath,
			[
				frontmatter,
				parsedContent || ""
			].join("\n")
		);
	},
	/**
	 * Read and parse a post file
	 * @param filePath
	 * @param post
	 * @returns
	 */
	read: async function (filePath: string, post: string) {
		try {
			const source = await fs.readFile(path.resolve(filePath));

			const { data: metadata, content } = matter(source);

			const slug = getFileName(filePath);

			if (!Object.keys(metadata).length) {
				contentLogger.warn(`No valid metadata was found at path ${filePath} - skipping`);
				return null;
			}

			return { path: filePath, slug, post, metadata, content }
		} catch (error) {
			console.warn(`Couldn't parse metadata from path ${filePath}`);
			console.error(error);
			return null;
		}
	},
	/**
	 * Parse javascript object to valid frontmatter string
	 * @param metadata
	 * @returns
	 */
	parseFrontmatter: function<T extends GenericObject>(metadata: T) {
		const parseEntry = (value: unknown) => {
			switch (typeof value) {
				case "object":
					return JSON.stringify(value);
				case "number":
					return value;
				case "string":
					return `\"${value}\"`;
				case "boolean":
					return value;
				default:
					return undefined;
			}
		}

		const parsedMetadataEntries = Object.entries(metadata).map(
			([field, value]) => {
				const parsedValue = parseEntry(value);

				if (parsedValue === undefined) { return []; }

				return { field, value: parsedValue };
			}
		).flat();

		return [
			"---",
			...(parsedMetadataEntries.map((entry) => `${entry.field}: ${entry.value}`)),
			"---"
		].join("\n");
	}
}
