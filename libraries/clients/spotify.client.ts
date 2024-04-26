import { generateRandomString, parseValueToString } from "@/libraries/utilities";
import type {
	SpotifyConfigs,
	SpotifyResponses,
	SpotifyScopes,
	SpotifyClientConfig
} from "@/libraries/types";
import { createRequestClient } from "@/libraries/clients/request.client";

const URLS = {
	accounts: "https://accounts.spotify.com",
	api: "https://api.spotify.com"
}

export const createSpotifyClient = (config: SpotifyClientConfig) => {
	const { clientId, clientSecret, redirectURI } = config;

	if (!clientId || !clientSecret) {
		throw new Error("clientId and clientSecret is required to initialise Spotify client");
	}

	const headers: HeadersInit = {}

	const baseQueryParams = new URLSearchParams({
		client_id: clientId,
		client_secret: clientSecret,
		redirect_uri: redirectURI
	});

	const clients = {
		accounts: createRequestClient({ baseUrl: URLS.accounts }),
		api: createRequestClient({ baseUrl: URLS.api })
	};

	const generateBasicAuthClaim = () => {
		return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
	}

	const generateBearerAuthClaim = (accessToken?: string) => {
		return { Authorization: headers.Authorization || `Bearer ${accessToken}` };
	}

	return {
		/**
		 *
		 * @param scopes
		 * @returns
		 */
		generateAuthorizationCodeFlowURL: (scopes: SpotifyScopes[] | string) => {
			const queryParams = new URLSearchParams(baseQueryParams);

			queryParams.set("scopes", typeof scopes === "string" ? scopes : scopes.join(","));
			queryParams.set("state", generateRandomString(16));
			queryParams.set("response_type", "code");

			return `${clients.accounts.baseUrl}/authorize?${queryParams.toString()}`;
		},
		/**
		 *
		 * @returns
		 */
		getCodeFromClientCredentials: () => {
			const payload = new URLSearchParams({ grant_type: "client_credentials" });

			return clients.accounts<SpotifyResponses["getCodeFromClientCredentials"]>({
				url: "/api/token",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: generateBasicAuthClaim(),
				}
			});
		},
		/**
		 *
		 * @param code
		 * @param setToken for duration of client life
		 * @returns
		 */
		getAccessToken: async (code: string) => {
			const payload = new URLSearchParams({
				grant_type: "authorization_code",
				redirect_uri: redirectURI,
				code
			});

			return clients.accounts<SpotifyResponses["getAccessToken"]>({
				url: "/api/token",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: generateBasicAuthClaim()
				}
			});
		},
		/**
		 *
		 * @param refreshToken
		 * @returns
		 */
		refreshAccessToken: async (refreshToken: string, setAuth?: boolean) => {
			const payload = new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: refreshToken,
				client_id: clientId
			});

			const response = await clients.accounts<SpotifyResponses["getAccessToken"]>({
				url: "/api/token",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: generateBasicAuthClaim()
				}
			});

			if (setAuth) { headers.Authorization = `Bearer ${response.access_token}`; }

			return response;
		},
		/**
		 *
		 * @param config
		 * @param accessToken
		 * @returns
		 */
		searchForItem: async (config: SpotifyConfigs["searchForItem"], accessToken?: string) => {
			const queryParams = new URLSearchParams(
				Object.entries(config).map(([param, value]) => [param, parseValueToString(value)])
			);

			return clients.api<SpotifyResponses["searchForItem"]>({
				url: `/v1/search?${queryParams.toString()}`,
				headers: generateBearerAuthClaim(accessToken)
			});
		},
		getArtistMusic: (config: SpotifyConfigs["getArtistMusic"], accessToken?: string) => {
			const queryParams = new URLSearchParams(
				Object.entries(config).map(([param, value]) => [param, parseValueToString(value)])
			);

			const artistId = queryParams.get("id");

			queryParams.delete("id");

			return clients.api<SpotifyResponses["getArtistMusic"]>({
				url: `/v1/artists/${artistId}/albums?${queryParams.toString()}`,
				headers: generateBearerAuthClaim(accessToken)
			});
		},
		getAlbumTracks: (config: SpotifyConfigs["getAlbumTracks"], accessToken?: string) => {
			const queryParams = new URLSearchParams(
				Object.entries(config).map(([param, value]) => [param, parseValueToString(value)])
			);

			const albumId = queryParams.get("id");

			queryParams.delete("id");

			return clients.api<SpotifyResponses["getAlbumTracks"]>({
				url: `/v1/albums/${albumId}/tracks?${queryParams.toString()}`,
				headers: generateBearerAuthClaim(accessToken)
			});
		}
	}
}

