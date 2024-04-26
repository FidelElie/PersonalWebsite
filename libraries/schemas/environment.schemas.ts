import * as valibot from "valibot";

export const spotifyEnvironment = valibot.object({
	SPOTIFY_CLIENT_ID: valibot.string(),
	SPOTIFY_CLIENT_SECRET: valibot.string(),
	SPOTIFY_REDIRECT_URI: valibot.string(),
	SPOTIFY_REFRESH_TOKEN: valibot.nullish(valibot.string())
});
