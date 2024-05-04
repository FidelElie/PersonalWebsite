
import type { ContentConfig } from "@/content/types";

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
