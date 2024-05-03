import sharp from "sharp";

import { PostSyncContext } from "@/content/types";

import { getSpotifyEnv } from "@/libraries/schemas";
import { createSpotifyClient } from "@/libraries/clients";
import type { SpotifyArtistObject } from "@/libraries/types";
import { sanitizeToURLSlug, streamToUnit8Array } from "@/libraries/utilities";

import type {
	MusicArtistMetadataSchema,
	MusicPostMetadataSchema
} from "@/libraries/schemas/music.schemas";

export const onSyncMusicData: PostSyncContext<MusicPostMetadataSchema> = async (context) => {
	const { posts } = context;

	const spotifyClient = createSpotifyClient(getSpotifyEnv());

	await spotifyClient.refreshAccessToken();

	const trackEntries = posts.filter(post => post.metadata.type === "track");
	const albumEntries = posts.filter(post => post.metadata.type === "album");

	const [
		trackInformation,
		albumInformation,
		artistInformation
	] = await Promise.all([
		spotifyClient.getTracks({ ids: trackEntries.map(entry => entry.metadata.spotifyId) }),
		spotifyClient.getAlbums({ ids: albumEntries.map(entry => entry.metadata.spotifyId) }),
		spotifyClient.getArtists({
			ids: Array.from(new Set(posts.map(post => post.metadata.artists).flat()))
		})
	]);

	const projectAssets = await Promise.all(
		[...trackInformation, ...albumInformation].map(async project => {
			const correspondingPost = posts.find(post => post.metadata.spotifyId === project.id);

			if (!correspondingPost) { return []; }

			const images = (project.type === "album" ? project.images : project.album.images).toSorted(
				(a, b) => b.width - a.width
			);

			if (!images.length) { return []; }

			const placeholder = await imagePlaceholderFromSpotify(images[0].url);

			return {
				slug: correspondingPost.slug,
				type: "project",
				images,
				placeholder
			}

		})
	);

	const artistsResult = await getArtistInformation(artistInformation);

	return {
		metadata: {
			artists: artistsResult.metadata,
			covers: [...projectAssets.flat(), ...artistsResult.assets]
		}
	}
}

const getArtistInformation = async (artists: SpotifyArtistObject[]) => {
	const metadata = artists.map(artist => {
		const artistSlugSection = sanitizeToURLSlug(artist.name) || "";

		return {
			slug: artistSlugSection,
			name: artist.name,
			spotifyLink: artist.external_urls.spotify,
			spotifyId: artist.id,
			genres: artist.genres
		} satisfies MusicArtistMetadataSchema;
	}).flat();

	const assets = await Promise.all(
		artists.map(async artist => {
			const correspondingMetadataEntry = metadata.find(entry => entry.spotifyId === artist.id);

			if (!correspondingMetadataEntry) { return []; }

			const images = artist.images.toSorted((a, b) => b.width - a.width);

			if (!images.length) { return []; }

			const placeholder = await imagePlaceholderFromSpotify(images[0].url);

			return {
				slug: correspondingMetadataEntry.slug,
				type: "artist",
				images,
				placeholder
			}
		})
	);

	return { metadata, assets: assets.flat() }
}

const imagePlaceholderFromSpotify = async (url: string) => {
	const { body } = await fetch(url);

	if (!body) { return null; }

	const imageData = await streamToUnit8Array(body);

	const modifiedImage = await (
		sharp(imageData).resize({ width: 10, height: 10 }).toFormat("png").toBuffer()
	);

	return `data:image/png;base64,${modifiedImage.toString("base64")}`;
}

