import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import type { GetStaticProps } from "next";
import { Fragment, MouseEventHandler, useState } from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import clsx from "clsx";

import type { ContentPost } from "@/content/types";
import { fetchMusicInformation } from "@/libraries/functions";
import {
	MusicArtistMetadataSchema,
	MusicPostMetadataSchema,
	SpotifyImageMetadataSchema
} from "@/libraries/schemas";

export default function MusicPostsPage() {
	const infiniteMusicPostsQuery = fetchMusicInformation.useInfiniteQuery({ limit: 9 });

	return (
		<div className="container max-w-5xl mx-auto px-5 flex flex-col gap-5 pt-5 pb-10">
			<Head>
				<title>Music | FiPE</title>
			</Head>
			<h1 className="text-5xl mb-2.5 font-light tracking-tight">Music</h1>
			{
				infiniteMusicPostsQuery.hasPreviousPage && (
					<button
						onClick={() => infiniteMusicPostsQuery.fetchPreviousPage()}
						className="px-5 py-2 rounded-lg border bg-white text-gray-500 shadow-xl"
						disabled={infiniteMusicPostsQuery.isFetching}
					>
						Load Previous
					</button>
				)
			}
			{
				infiniteMusicPostsQuery.isSuccess && (
					<div className="flex flex-wrap w-full flex-grow">
						{
							infiniteMusicPostsQuery.data.pages.map((page, pageIndex) => (
								<Fragment key={pageIndex}>
									{page.items.map(post => <PostEntry key={post.slug} post={post} />)}
								</Fragment>
							))
						}
					</div>
				)
			}
			{
				infiniteMusicPostsQuery.hasNextPage && (
					<button
						onClick={() => infiniteMusicPostsQuery.fetchNextPage()}
						className="px-5 py-2 rounded-lg border bg-white text-gray-500 shadow-xl"
						disabled={infiniteMusicPostsQuery.isFetching}
					>
						Load Next
					</button>
				)
				// : (
				// 	<p className="font-light text-sm text-center px-5 py-3 rounded border">
				// 		You have reached the end, more posts to come :)
				// 	</p>
				// )
			}
		</div>
	);
}

const PostEntry = (props: PostEntryProps) => {
	const { post: { slug, publishedAt, metadata } } = props;

	const [selected, setSelected] = useState(false);

	const firstArtist = metadata.artists[0];

	const handleToggleSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		event.stopPropagation();

		setSelected(!selected);
	}

	const isNewPost = () => {
		if (!publishedAt) { return true; }

		const current = new Date();
		const publishedDate = new Date(publishedAt);

		const value = current.valueOf() - publishedDate.valueOf();

		return value <= 1000 * 3600 * 24 * 7;
	}

	return (
		<Link
			key={slug}
			href={`/music/${slug}`}
			className="group block w-full sm:w-1/2 md:w-1/3 relative aspect-square overflow-hidden border"
			onMouseLeave={() => setSelected(false)}
		>
			{
				!!metadata.cover && (
					<Image
						src={metadata.cover.images[0].url}
						alt={`${metadata.name} cover`}
						placeholder="blur"
						blurDataURL={metadata.cover.placeholder}
						fill
					/>
				)
			}
			{
				isNewPost() && (
					<span
						className="text-black bg-white top-1 right-1 rounded absolute px-3 py-1 font-light text-xs border"
					>
						New{!publishedAt && " (Unpublished)"}
					</span>
				)
			}

			<span className={clsx(
				"absolute w-full bottom-0 py-2 px-3 text-xs text-white",
				"flex items-center gap-2, transition-all",
				"opacity-100 group-hover:opacity-100 lg:opacity-0",
				selected && "bg-gray-900 bg-opacity-40"
			)}>
				<button
					className="w-8 h-8 flex-shrink-0 rounded-full shadow-xl relative overflow-hidden"
					onClick={handleToggleSelect}
				>
					{
						firstArtist.cover && (
							<Image
								src={firstArtist.cover?.images[0].url}
								alt={`${firstArtist.name}`}
								placeholder="blur"
								blurDataURL={firstArtist.cover.placeholder}
								fill
							/>
						)
					}
				</button>
				<span className={clsx(
					"transition-all whitespace-nowrap text-ellipsis overflow-hidden ml-2 text-white font-light",
					selected ? "visible opacity-100" : "invisible opacity-0"
				)}>
					{firstArtist.name} - {metadata.name}
				</span>
			</span>
		</Link>
	)
}

interface PostEntryProps {
	post: ContentPost<
		(
			Omit<Extract<MusicPostMetadataSchema, { type: "album" }>, "artists"> |
			Omit<Extract<MusicPostMetadataSchema, { type: "track" }>, "artists">
		) & {
			cover: SpotifyImageMetadataSchema | null;
			artists: (MusicArtistMetadataSchema & { cover: SpotifyImageMetadataSchema | null })[];
		}
	>;
}

export const getStaticProps: GetStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchInfiniteQuery({
		queryKey: ["music"],
		queryFn: ({ pageParam }) => fetchMusicInformation.local({ offset: pageParam }),
		initialPageParam: 0
	});

	return { props: { dehydratedState: dehydrate(queryClient) } };
}
