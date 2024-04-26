import { defineContentConfig } from "@/content/config";

import { createNewMusicPost } from "@/libraries/commands";
import { MusicPostSchema } from "@/libraries/schemas";

export default defineContentConfig(
	{
		debug: true,
		entries: [
			{
				id: "music",
				name: "Music",
				onCreate: createNewMusicPost,
				validator: (input) => MusicPostSchema.parse(input)
			},
			// {
			// 	id: "projects",
			// 	name: "Projects"
			// }
		],
		posts: {
			metadataDir: "./posts"
		}
	}
);
