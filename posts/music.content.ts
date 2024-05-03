import { definePostEntry, definePostMetadata } from "@/content/config";

import {
	MusicArtistMetadataSchema,
	MusicPostMetadataSchema,
	SpotifyImageMetadataSchema
} from "@/libraries/schemas/music.schemas";
import { onCreateMusicPost, onSyncMusicData } from "@/libraries/commands/music";

export const MusicContent = definePostEntry({
	id: "music",
	name: "Music",
	path: () => {
		const date = new Date();

		return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
	},
	validator: (input) => MusicPostMetadataSchema.parse(input),
	onCreate: onCreateMusicPost,
	onSync: onSyncMusicData,
	metadata: [
		definePostMetadata({
			id: "artists",
			validator: (input) => MusicArtistMetadataSchema.parse(input),
			accessor: (entry) => entry.spotifyId,
			external: true
		}),
		definePostMetadata({
			id: "covers",
			validator: (input) => SpotifyImageMetadataSchema.parse(input),
			accessor: (entry) => entry.slug,
			external: true
		})
	]
});
