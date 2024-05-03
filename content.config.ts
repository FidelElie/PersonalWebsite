import { defineContentConfig } from "@/content/config";

import { MusicContent } from "@/posts/music.content";

export default defineContentConfig(
	{
		debug: true,
		entries: [MusicContent],
		posts: {
			metadataDir: "./posts"
		}
	}
);
