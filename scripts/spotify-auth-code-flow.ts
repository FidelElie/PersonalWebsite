import "dotenv/config";

import open from "open";
import picocolors from "picocolors";

import { getSpotifyEnv } from "@/libraries/schemas";
import { createSpotifyClient } from "@/libraries/clients";

const startSpotifyAuthFlow = async () => {
	console.log("Starting Spotify authorisation code flow");

	const spotifyClient = createSpotifyClient(getSpotifyEnv());

	await spotifyClient.refreshAccessToken();

	const url = spotifyClient.generateAuthorizationCodeFlowURL(
		[
			"user-library-read",
			"user-follow-modify",
			"user-follow-read",
			"user-read-currently-playing",
			"user-read-playback-position",
			"user-read-playback-state",
			"user-read-recently-played"
		]
	);

	console.log(`Opening browser to ${picocolors.blue(url)}`);

	open(url);
}

if (require.main === module) { startSpotifyAuthFlow(); }
