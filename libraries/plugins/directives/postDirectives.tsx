import { renderToString } from "react-dom/server";

import { createRegExpDirective } from "@/libraries/plugins/remarkRegExpDirective";
import {
	fetchMusicArtistBySpotifyID,
	fetchMusicCoverBySlug,
	fetchMusicPostBySlug
} from "@/libraries/functions";

import { MusicBookmark } from "@/components/interfaces";

export const MusicPostDirective = createRegExpDirective({
	identifier: /:music\[.*?\]/g,
	onMatch: (match) => {
		return { replace: match[0], slug: match[1] }
	},
	getHTML: (result) => {
		const correspondingPost = fetchMusicPostBySlug(result.slug);

		if (!correspondingPost) { return undefined; }

		const correspondingArtist = fetchMusicArtistBySpotifyID(
			correspondingPost.metadata.artists[0]
		);

		if (!correspondingArtist) { return undefined; }

		const postCover = fetchMusicCoverBySlug(correspondingPost.slug);

		const coverImage = postCover?.images[0].url;

		return renderToString(
			<MusicBookmark
				post={correspondingPost}
				artist={correspondingArtist?.name}
				cover={coverImage}
			/>
		);
	}
});
