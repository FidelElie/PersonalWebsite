import {
	fetchMusicPosts,
	fetchMusicArtists,
	fetchMusicCoverBySlug,
	fetchMusicPostBySlug,
	fetchMusicArtistBySlug
} from "@/libraries/functions/music.functions";

export const fetchMusicInformation = async function (config: {
	offset?: number | string | null;
	limit?: number | string | null;
}) {
	return fetchMusicPosts({
		limit: config.limit || 9,
		offset: config.offset || 0,
		transform: async (entries) => {
			return Promise.all(
				entries.map(async entry => {
					const musicArtists = await fetchMusicArtists({
						offset: 0,
						limit: Number.MAX_SAFE_INTEGER,
						filter: (artist) => entry.metadata.artists.includes(artist.spotifyId),
						transform: (artists) => {
							return artists.map(artist => {
								const artistCover = fetchMusicCoverBySlug(artist.slug);

								return { ...artist, cover: artistCover };
							})
						}
					});

					const projectCover = fetchMusicCoverBySlug(entry.slug);

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
}

export const fetchMusicPostInformationBySlug = async function (slug: string) {
	const musicPost = await fetchMusicPostBySlug(slug);

	if (!musicPost) { return null; }

	const musicCover = fetchMusicCoverBySlug(slug);

	const artistsInPost = await fetchMusicArtists({
		filter: (artist) => musicPost.metadata.artists.includes(artist.spotifyId),
		transform: (artists) => {
			return Promise.all(
				artists.map(artist => {
					const artistCover = fetchMusicCoverBySlug(artist.slug);

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

export const fetchMusicArtistsWithCovers = async function (config: {
	offset?: number | string | null;
	limit?: number | string | null;
}) {
	return fetchMusicArtists({
		limit: config.limit,
		offset: config.offset || 0,
		transform: async (artists) => {
			return Promise.all(
				artists.map(async artist => {
					const artistCover = fetchMusicCoverBySlug(artist.slug);

					return {...artist, cover: artistCover }
				})
			)
		}
	});
}

export const fetchMusicArtistInformationBySlug = async function (slug: string) {
	const musicArtist = fetchMusicArtistBySlug(slug);

	if (!musicArtist) { return null; }

	const artistCover = fetchMusicCoverBySlug(slug);

	const artistPosts = await fetchMusicPosts({
		filter: (post) => post.metadata.artists.includes(musicArtist.spotifyId),
		transform: (posts) => posts.map(post => {
			const postCover = fetchMusicCoverBySlug(post.slug);

			return {
				...post,
				metadata: {
					...post.metadata,
					cover: postCover
				}
			}
		})
	});

	return {
		...musicArtist,
		cover: artistCover,
		posts: artistPosts.items
	}
}
