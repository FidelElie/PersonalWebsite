import type { ContentConfig, PostEntry, PostMetadataEntry } from "@/content/types";

import type { RequiredObject } from "@/libraries/types";

export const DEFAULT_CONTENT_CONFIG: RequiredObject<ContentConfig> = {
	debug: false,
	entries: [],
	posts: {
		postsDir: "./posts",
		metadataDir: null
	},
	build: {
		includeContent: false,
	},
	markdown: {
		type: "mdx",
		plugins: {
			rehypePlugins: [],
			remarkPlugins: [],
		}
	}
}

/**
 * Helper to create type safe post entries with inference
 * @param config
 * @returns post entry
 */
export const definePostEntry = <T>(config: PostEntry<T>) => config;

/**
 * Helper to create type safe post entry metadata with inference
 * @param config
 * @returns post metadata entry
 */
export const definePostMetadata = <T>(config: PostMetadataEntry<T>) => config;

/**
 * Helper to create type safe content config
 * @param config
 * @returns configuration for content handling
 */
export const defineContentConfig = (config: ContentConfig) => {
	if (!config.entries.length) { throw new Error("No post entries were registered in config"); }

	const metadataEntries = config.entries.map(entry => entry.metadata || []).flat();

	if (metadataEntries.some(
		entry => typeof entry.external === "string" && entry.external.endsWith(".json")
	)) {
		throw new Error("Invalid external path on metadata was added - json format is required");
	}

	return config;
}
