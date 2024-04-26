import "dotenv/config";

import open from "open";
import * as valibot from "valibot";
import picocolors from "picocolors";

import { spotifyEnvironment } from "@/libraries/schemas";
import { createSpotifyClient } from "@/libraries/clients";

const startSpotifyAuthFlow = () => {
	console.log("Starting Spotify authorisation code flow");
	const validatedEnvironment = valibot.parse(spotifyEnvironment, process.env);

	const spotifyClient = createSpotifyClient({
		clientId: validatedEnvironment.SPOTIFY_CLIENT_ID,
		clientSecret: validatedEnvironment.SPOTIFY_CLIENT_SECRET,
		redirectURI: validatedEnvironment.SPOTIFY_REDIRECT_URI
	});

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
