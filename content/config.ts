import type { ContentConfig } from "@/content/types";
import { RequiredObject } from "@/libraries/types";

export const DEFAULT_CONTENT_CONFIG: RequiredObject<ContentConfig> = {
	debug: false,
	entries: [],
	posts: {
		postsDir: "./posts",
		metadataDir: null,
		emitMetadata: true,
		metadataFormat: "json",
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

export const defineContentConfig = (config: ContentConfig) => {
	const { entries } = config;

	if (!entries.length) { throw new Error("No post entries were found."); }

	return config;
};
