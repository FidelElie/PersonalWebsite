// import readline from "readline";

import ora from "ora";
import * as valibot from "valibot";
import * as inquirer from "@inquirer/prompts";

import { sanitizeToURLSlug } from "@/libraries/utilities";
import { MusicPostSchema, spotifyEnvironment } from "@/libraries/schemas";
import { createSpotifyClient } from "@/libraries/clients";
import type {
	SpotifyTrackObject,
	SpotifyArtistObject,
	SpotifySimplifiedAlbumObject
} from "@/libraries/types";
import { writeContentPost } from "@/content/core";
import { ContentConfig, PostContext } from "@/content/types";

// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);

export const createNewMusicPost = async (context: PostContext<MusicPostSchema>) => {
	const { config } = context;

	const validatedEnvironment = valibot.parse(spotifyEnvironment, process.env);

	const spotifyClient = createSpotifyClient({
		clientId: validatedEnvironment.SPOTIFY_CLIENT_ID,
		clientSecret: validatedEnvironment.SPOTIFY_CLIENT_SECRET,
		redirectURI: validatedEnvironment.SPOTIFY_REDIRECT_URI
	});

	if (!validatedEnvironment.SPOTIFY_REFRESH_TOKEN) {
		throw new Error("SPOTIFY_REFRESH_TOKEN is required to operate");
	}

	try {
		await spotifyClient.refreshAccessToken(validatedEnvironment.SPOTIFY_REFRESH_TOKEN, true);

		const searchPhrase = await inquirer.input({
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
			new inquirer.Separator("Albums"),
			...response.albums.items,
			new inquirer.Separator("Tracks"),
			...response.tracks.items,
			new inquirer.Separator("Artists"),
			...response.artists.items
		];

		loading.succeed(`Found ${options.length - 3} results`);

		const chosenOptionId = await inquirer.select({
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
				return handleAlbumPostCreation(chosenValue, spotifyClient, config);
			case "artist":
				return handleArtistPostCreation(chosenValue, spotifyClient, config);
			case "track":
				return handleTrackPostCreation(chosenValue, config);
			default:
				throw new Error(`Cannot handle type from search, got ${chosenValue.type}`);
		}
	} catch (error) {
		console.error(error);
	}
}

const handleArtistPostCreation = async (
	entry: SpotifyArtistObject,
	client: ReturnType<typeof createSpotifyClient>,
	config: ContentConfig<MusicPostSchema>
) => {
	const artistId = entry.id;

	const { items: artistMusic } = await client.getArtistMusic({ id: artistId });

	const artistEntryId = await inquirer.select({
		message: `Pick music entry for ${entry.name}`,
		choices: artistMusic.map(entry => ({ value: entry.id, name: entry.name }))
	});

	const artistEntry = artistMusic.find(entry => entry.id === artistEntryId);

	if (!artistEntry) { throw new Error("Couldn't find chosen artist entry"); }

	const albumId = entry.id;

	const pickAlbum = await inquirer.confirm({
		message: "Pick an album or containing track",
		default: true
	});

	if (pickAlbum) { return handleAlbumPostCreation(artistEntry, client, config); }

	const { items: albumTracks } = await client.getAlbumTracks({ id: albumId });

	const trackId = await inquirer.select({
		message: `Pick favourite songs from ${entry.name}`,
		choices: albumTracks.map((track, trackIndex) => ({
			value: track.id,
			name: `${trackIndex + 1}. ${track.name}`
		}))
	});

	const track = albumTracks.find(track => track.id === trackId);

	if (!track) { throw new Error(`Could not find track with ID ${trackId}`); }

	return handleTrackPostCreation(track, config);
}

const handleAlbumPostCreation = async (
	entry: SpotifySimplifiedAlbumObject,
	client: ReturnType<typeof createSpotifyClient>,
	config: ContentConfig<MusicPostSchema>
) => {
	const albumId = entry.id;

	const { items: albumTracks } = await client.getAlbumTracks({ id: albumId });

	const favouriteSongIds = await inquirer.checkbox({
		message: `Pick favourite songs from ${entry.name}`,
		choices: albumTracks.map((track, trackIndex) => ({
			value: track.id,
			name: `${trackIndex + 1}. ${track.name}`
		})),
		loop: false
	});

	const favouriteSongs = favouriteSongIds.map(
		id => albumTracks.find(track => track.id === id) || []
	).flat();

	console.log(`Creating post for ${entry.name}`);

	const albumFrontmatter = [
		"---",
		`spotifyId: ${entry.id}`,
		`name: ${entry.name}`,
		`artists: ${JSON.stringify(entry.artists.map(artist => ({
			spotifyId: artist.id,
			name: artist.name
		})))
		}`,
		`type: ${entry.type}`,
		`images: ${JSON.stringify(entry.images)}`,
		`favourites: ${JSON.stringify(favouriteSongs.map(song => ({ spotifyId: song.id, name: song.name })))}`,
		`release: ${entry.release_date}`,
		"---"
	].join("\n");

	const albumSlug = sanitizeToURLSlug(`${entry.artists[0].name} ${entry.name}`);

	await writeContentPost({
		filename: `${albumSlug}.mdx`,
		content: albumFrontmatter,
		prefix: "music",
		config
	});
}

const handleTrackPostCreation = async (
	entry: SpotifyTrackObject,
	config: ContentConfig<MusicPostSchema>
) => {
	const trackFrontmatter = [
		"---",
		`spotifyId: ${entry.id}`,
		`name: ${entry.name}`,
		`artists: ${JSON.stringify(entry.artists.map(artist => ({
			spotifyId: artist.id,
			name: artist.name
		})))
		}`,
		`type: ${entry.type}`,
		`images: ${JSON.stringify(entry.album.images)}`,
		`release: ${entry.album.release_date}`,
		"---"
	].join("\n");

	const trackSlug = sanitizeToURLSlug(`${entry.artists[0].name} ${entry.name}`);

	await writeContentPost({
		filename: `${trackSlug}.mdx`,
		content: trackFrontmatter,
		prefix: "music",
		config
	});
}

// type SpotifySearchObjects = (
// 	SpotifyAlbumObject<SpotifySimplifiedArtistObject> |
// 	SpotifyArtistObject |
// 	SpotifyTrackObject |
// 	undefined
// );

// const navigateSpotifySearch = async (
// 	phrase: string,
// 	options: (
// 		Flatten<ObjectKeyValues<SpotifyResponses["searchForItem"]>["items"][]>[number] |
// 		inquirer.Separator
// 	)[]
// ) => {
// 	let chosenValue: SpotifySearchObjects;

// 	const selectableOptions = options.map(option => {
// 		if (option.type !== "album" && option.type !== "artist" && option.type !== "track") {
// 			return [];
// 		}

// 		return option;
// 	}).flat();

// 	try {
// 		const chosenOption = inquirer.select({
// 			message: `Results for ${phrase}`,
// 			choices: options.map(option => {
// 				switch(option.type) {
// 					case "album":
// 					case "artist":
// 					case "track":
// 						return {
// 							value: option.id,
// 							name: `${option.name} | ${option.type}`
// 						}
// 					case "separator":
// 						return option;
// 					default:
// 						return [];
// 				}
// 			}).flat(),
// 			loop: false
// 		});

// 		// process.stdin.on('keypress', (_, key) => {
// 		// 	if (key.ctrl && key.name === 'c') {
// 		// 		process.exit();
// 		// 	} else {
// 		// 		switch(key.name) {
// 		// 			case "left":
// 		// 				// chosenOption.cancel();
// 		// 			case "right":
// 		// 				// chose
// 		// 		}
// 		// 		// console.log(`You pressed the "${str}" key`);
// 		// 		// console.log();
// 		// 		// console.log(key);
// 		// 		// console.log();
// 		// 	}
// 		// });

// 		const answer = await chosenOption;

// 		chosenValue = selectableOptions.find(
// 			option => (
// 				option.type === "album" ||
// 				option.type === "track" ||
// 				option.type === "artist"
// 			) && option.id === answer
// 		);

// 		switch(chosenValue?.type) {
// 			case "album":

// 		}
// 	} catch (error) {
// 	}
// }

