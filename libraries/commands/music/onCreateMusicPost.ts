import ora from "ora";
import { input, Separator, select, checkbox, confirm } from "@inquirer/prompts";

import { getSpotifyEnv } from "@/libraries/schemas";
import { createSpotifyClient } from "@/libraries/clients";
import type {
	SpotifyTrackObject,
	SpotifyArtistObject,
	SpotifySimplifiedAlbumObject
} from "@/libraries/types";

import { createPostUrlSlug } from "@/content/utilities";
import { PostCreationContext } from "@/content/types";

import { MusicPostMetadataSchema } from "@/libraries/schemas/music.schemas";

export const onCreateMusicPost: PostCreationContext<MusicPostMetadataSchema> = async () => {
	const spotifyClient = createSpotifyClient(getSpotifyEnv());

	await spotifyClient.refreshAccessToken();

	const searchPhrase = await input({
		message: "Search Spotify...",
		validate: (input) => !!input
	});

	const loading = ora(`Searching Spotify for ${searchPhrase}`).start();

	const response = await spotifyClient.searchForItem({
		q: searchPhrase,
		type: ["album", "artist", "track"],
		limit: 5
	});

	const options = [
		new Separator("Albums"),
		...response.albums.items,
		new Separator("Tracks"),
		...response.tracks.items,
		new Separator("Artists"),
		...response.artists.items
	];

	loading.succeed(`Found ${options.length - 3} results`);

	const chosenOptionId = await select({
		message: `Results for ${searchPhrase}`,
		choices: options.map(option => {
			switch (option.type) {
				case "separator":
					return option;
				case "artist":
					return { value: option.id, name: option.name };
				default:
					const firstArtist = option.artists[0];

					return { value: option.id, name: `${firstArtist.name} - ${option.name}` }
			}
		}),
		loop: false
	});

	const chosenValue = options.find(
		entry => entry.type !== "separator" && entry.id === chosenOptionId
	);

	if (!chosenValue) { throw new Error(`Couldn't find entry with id ${chosenOptionId}`); }

	switch (chosenValue.type) {
		case "album":
			return handleAlbumPostCreation(chosenValue, spotifyClient);
		case "artist":
			return handleArtistPostCreation(chosenValue, spotifyClient);
		case "track":
			return handleTrackPostCreation(chosenValue, spotifyClient);
		default:
			throw new Error(`Cannot handle type from search, got ${chosenValue.type}`);
	}
}

const handleArtistPostCreation = async (
	entry: SpotifyArtistObject,
	client: ReturnType<typeof createSpotifyClient>
) => {
	const artistId = entry.id;

	const { items: artistMusic } = await client.getArtistMusic({ id: artistId });

	const artistEntryId = await select({
		message: `Pick music entry for ${entry.name}`,
		choices: artistMusic.map(entry => ({ value: entry.id, name: entry.name }))
	});

	const artistEntry = artistMusic.find(entry => entry.id === artistEntryId);

	if (!artistEntry) { throw new Error("Couldn't find chosen artist entry"); }

	const pickAlbum = await confirm({
		message: "Create album post?",
		default: true
	});

	if (pickAlbum) { return handleAlbumPostCreation(artistEntry, client); }

	const { items: albumTracks } = await client.getAlbumTracks({ id: entry.id });

	const trackId = await select({
		message: `Pick favourite songs from ${entry.name}`,
		choices: albumTracks.map((track, trackIndex) => ({
			value: track.id,
			name: `${trackIndex + 1}. ${track.name}`
		})),
		loop: false
	});

	const track = albumTracks.find(track => track.id === trackId);

	if (!track) { throw new Error(`Could not find track with ID ${trackId}`); }

	return handleTrackPostCreation(track, client);
}

const handleAlbumPostCreation = async (
	entry: SpotifySimplifiedAlbumObject,
	client: ReturnType<typeof createSpotifyClient>
) => {
	const albumId = entry.id;

	const [
		album,
		{ items: albumTracks }
	] = await Promise.all([
		client.getAlbum({ id: albumId }),
		client.getAlbumTracks({ id: albumId })
	]);

	const favouriteSongIds = await checkbox({
		message: `Pick favourite songs from ${entry.name}`,
		choices: albumTracks.map((track, trackIndex) => ({
			value: track.id,
			name: `${trackIndex + 1}. ${track.name}`
		})),
		loop: false
	});

	const trackList = albumTracks.map(track => ({
		name: track.name,
		spotifyId: track.id,
		favourite: favouriteSongIds.includes(track.id)
	}));

	console.log(`Creating post for ${entry.name}`);

	const albumSlug = await createPostUrlSlug(`${entry.artists[0].name} ${entry.name}`);

	const rating = await chooseRecordRating("album");

	return {
		slug: albumSlug,
		metadata: {
			name: entry.name,
			artists: entry.artists.map(artist => artist.id),
			type: entry.type,
			tracks: trackList,
			release: entry.release_date,
			rating,
			spotifyId: entry.id,
			spotifyLink: entry.external_urls.spotify,
			duration: albumTracks.reduce((total, track) => total + track.duration_ms, 0),
			genres: album.genres
		}
	}
}

const handleTrackPostCreation = async (
	entry: SpotifyTrackObject,
	client: ReturnType<typeof createSpotifyClient>
) => {
	const album = await client.getAlbum({ id: entry.album.id });

	const trackSlug = await createPostUrlSlug(`${entry.artists[0].name} ${entry.name}`);

	const rating = await chooseRecordRating("track");

	return {
		slug: trackSlug,
		metadata: {
			name: entry.name,
			artists: entry.artists.map(artist => artist.id),
			type: entry.type,
			release: entry.album.release_date,
			rating,
			spotifyId: entry.id,
			spotifyLink: entry.external_urls.spotify,
			duration: entry.duration_ms,
			genres: album.genres
		}
	}
}

const chooseRecordRating = async (type: "album" | "track") => {
	const chosenRating = await select({
		message: `What rating would you give this ${type}`,
		choices: [
			{ value: "Must listen" },
			{ value: "Worth it" },
			{ value: "Alright" },
			{ value: "Meh" },
			{ value: "Hot garbage"}
		] as const
	});

	return chosenRating;
}
