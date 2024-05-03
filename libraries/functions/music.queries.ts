import { z } from "zod";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
	fetchMusicPosts,
	fetchMusicArtists,
	fetchMusicCoverBySlug,
	fetchMusicPostBySlug
} from "@/libraries/functions/music.functions";
import { request } from "../clients";
import { PaginatedResponse } from "../schemas";
import { parseValueToString } from "../utilities";

export const fetchMusicInformation = {
	local: async function (config: {
		offset?: number | string | null;
		limit?: number | string | null;
	}) {
		return fetchMusicPosts.local({
			limit: config.limit || 9,
			offset: config.offset || 0,
			transform: async (entries) => {
				return Promise.all(
					entries.map(async entry => {
						const musicArtists = await fetchMusicArtists.local({
							offset: 0,
							limit: Number.MAX_SAFE_INTEGER,
							filter: (artist) => entry.metadata.artists.includes(artist.spotifyId),
							transform: (artists) => {
								return artists.map(artist => {
									const artistCover = fetchMusicCoverBySlug.local(artist.slug);

									return { ...artist, cover: artistCover };
								})
							}
						});

						const projectCover = fetchMusicCoverBySlug.local(entry.slug);

						return {
							...entry,
							metadata: {
								...entry.metadata,
								artists: musicArtists.items,
								cover: projectCover
							}
						}
					})
				);
			}
		});
	},
	request: async function (
		config?: { offset?: number | string | null; limit?: number | string | null }
	) {
		const params = new URLSearchParams();

		if (config?.limit) { params.set("limit", parseValueToString(config.limit)); }

		if (config?.offset) { params.set("offset", parseValueToString(config.offset)); }

		const response = await request({
			url: `/api/music${params.size > 1 ? `?${params.toString()}` : ""}`
		});

		return PaginatedResponse(z.any()).parse(response);
	},
	useInfiniteQuery: function (
		config?: { offset?: number; limit?: number }
	) {
		return useInfiniteQuery({
			queryKey: ["music"],
			queryFn: ({ pageParam }) => this.request({ offset: pageParam, limit: config?.limit }),
			initialPageParam: config?.offset || 0,
			getPreviousPageParam: (firstPage) => firstPage.previous,
			getNextPageParam: (lastPage) => lastPage.next,
		})
	}
}

export const fetchMusicPostInformation = {
	local: async function (slug: string) {
		const musicPost = await fetchMusicPostBySlug.local(slug);

		if (!musicPost) { return null; }

		const musicCover = fetchMusicCoverBySlug.local(slug);

		const artistsInPost = await fetchMusicArtists.local({
			filter: (artist) => musicPost.metadata.artists.includes(artist.spotifyId),
			transform: (artists) => {
				return Promise.all(
					artists.map(artist => {
						const artistCover = fetchMusicCoverBySlug.local(artist.slug);

						return { ...artist, cover: artistCover };
					})
				)
			}
		});

		return {
			...musicPost,
			metadata: {
				...musicPost.metadata,
				cover: musicCover,
				artists: artistsInPost.items
			}
		}
	}
}
