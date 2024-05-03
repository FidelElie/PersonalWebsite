import { z } from "zod";

import { useInfiniteQuery } from "@tanstack/react-query";

import MusicPostsMeta from "@/posts/music.meta.json";
import MusicArtistsMeta from "@/posts/artists.external.json";
import MusicCoversMeta from "@/posts/covers.external.json";

import { request } from "@/libraries/clients";
import { parseValueToString } from "@/libraries/utilities";
import {
	MusicArtistMetadataSchema,
	MusicContentPostSchema,
	SpotifyImageMetadataSchema
} from "@/libraries/schemas";
import { PaginatedResponse } from "../schemas";
import { PromiseOrNot } from "../types";

export const fetchMusicPostBySlug = {
	local: async function (slug: string) {
		const musicPosts = z.array(MusicContentPostSchema).parse(MusicPostsMeta.entries);

		return musicPosts.find(post => post.slug === slug) || null;
	}
}

export const fetchMusicPosts = {
	local: async function <T = MusicContentPostSchema>(
		config?: {
			offset?: number | string | null;
			limit?: number | string | null;
			transform?: (value: MusicContentPostSchema[]) => PromiseOrNot<T[]>;
			filter?: (value: MusicContentPostSchema) => boolean;
		}
	) {
		const {
			offset = 0,
			limit = MusicPostsMeta.entries.length,
			filter,
			transform
		} = config || {};

		const musicPosts = (() => {
			const validatedPosts = z.array(MusicContentPostSchema).parse(MusicPostsMeta.entries);

			if (!filter) { return validatedPosts; }

			return validatedPosts.filter(filter);
		})();

		const pageOffset = offset ? typeof offset === "string" ? parseInt(offset, 10) : offset : 0;
		const pageLimit = limit ? typeof limit === "string" ? parseInt(limit, 10) : limit : MusicPostsMeta.entries.length;

		const start = pageOffset * pageLimit;
		const end = start + pageLimit;
		const previousItem = !!musicPosts[start - 1];
		const nextItem = !!musicPosts[end + 1];

		const items = musicPosts.slice(start, end);

		const finalItems = transform ? await transform(items as any) : items;

		return {
			items: finalItems as T[],
			offset,
			limit,
			previous: previousItem ? pageOffset - 1 : null,
			next: nextItem ? pageOffset + 1 : null,
			total: musicPosts.length
		};
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

		return PaginatedResponse(MusicContentPostSchema).parse(response);
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
			maxPages: 3
		})
	}
}

export const fetchMusicArtists = {
	local: async function <T>(
		config?: {
			offset?: number | string | null;
			limit?: number | string | null;
			transform?: (value: MusicArtistMetadataSchema[]) => PromiseOrNot<T[]>;
			filter?: (entry: MusicArtistMetadataSchema) => boolean;
		}
	) {
		const { offset = 0, limit = MusicArtistsMeta.entries.length, filter, transform } = config || {};

		const musicArtists = (() => {
			const validatedEntries = z.array(MusicArtistMetadataSchema).parse(MusicArtistsMeta.entries);

			if (!filter) { return validatedEntries; }

			return validatedEntries.filter(filter);
		})();

		const pageOffset = offset ? typeof offset === "string" ? parseInt(offset, 10) : offset : 0;
		const pageLimit = limit ? typeof limit === "string" ? parseInt(limit, 10) : limit : MusicPostsMeta.entries.length;

		const start = pageOffset * pageLimit;
		const end = start + pageLimit;
		const previousItem = !!musicArtists[start - 1];
		const nextItem = !!musicArtists[end + 1];

		const items = musicArtists.slice(start, end);

		// FIXME
		const finalItems = transform ? await transform(items as any) : items;

		return {
			items: finalItems as T[],
			offset,
			limit,
			previous: previousItem ? pageOffset - 1 : null,
			next: nextItem ? pageOffset + 1 : null,
			total: musicArtists.length
		}
	}
}

export const fetchMusicCoverBySlug = {
	local: function(slug: string) {
		const musicCovers = z.array(SpotifyImageMetadataSchema).parse(MusicCoversMeta.entries);

		return musicCovers.find(post => post.slug === slug) || null;
	}
}
