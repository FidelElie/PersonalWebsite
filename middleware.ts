import * as valibot from "valibot";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { spotifyEnvironment } from "@/libraries/schemas";
import { createSpotifyClient } from "@/libraries/clients";

export async function middleware(request: NextRequest) {
	if (request.url.includes("/callback")) {
		const query = new URLSearchParams((new URL(request.url)).search);

		const validatedEnvironment = valibot.parse(spotifyEnvironment, process.env);

		const spotifyClient = createSpotifyClient({
			clientId: validatedEnvironment.SPOTIFY_CLIENT_ID,
			clientSecret: validatedEnvironment.SPOTIFY_CLIENT_SECRET,
			redirectURI: validatedEnvironment.SPOTIFY_REDIRECT_URI
		});

		const code = query.get("code");
		const state = query.get("state");

		if (!code || !state) {
			throw new Error("Authorisation code or state variable is missing from callback - aborting");
		}


		console.log("Callback received fetching Spotify Access Token");

		const spotifyAccessToken = await spotifyClient.getAccessToken(code);

		console.warn(
			`Ensure state value is the same as what triggered the callback: ${query.get("state")}`
		);

		console.log(spotifyAccessToken);

		return NextResponse.redirect(new URL("/", request.url))
	}

	return NextResponse.next();
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] }
