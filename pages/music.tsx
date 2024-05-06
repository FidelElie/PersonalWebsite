import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import type { GetServerSideProps } from "next";
import { MouseEventHandler, useState } from "react";
import clsx from "clsx";

import type { ContentPost } from "@/content/types";
import { fetchMusicInformation } from "@/libraries/functions";
import {
	MusicArtistMetadataSchema,
	MusicPostMetadataSchema,
	SpotifyImageMetadataSchema
} from "@/libraries/schemas";

export default function MusicPostsPage(props: MusicPostPageProps) {
	const { posts } = props;

	return (
		<div className="container max-w-5xl mx-auto px-5 flex flex-col gap-5 pt-5 pb-10">
			<Head>
				<title>Music | FiPE</title>
			</Head>
			<div className="flex flex-wrap w-full flex-grow">
				{ posts.map(post => <PostEntry key={post.slug} post={post}/>) }
			</div>
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
			className="group block w-full sm:w-1/2 md:w-1/3 p-2.5"
			onMouseLeave={() => setSelected(false)}
		>
			<div className="relative aspect-square rounded-lg border overflow-hidden p-1">
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
						<Link className="underline decoration-2 underline-offset-2" href={`/music/artists/${firstArtist.slug}`}>{firstArtist.name}</Link> - {metadata.name}
					</span>
				</span>
			</div>
		</Link>
	)
}

interface MusicPostPageProps {
	posts: ContentPost<
		(
			Omit<Extract<MusicPostMetadataSchema, { type: "album" }>, "artists"> |
			Omit<Extract<MusicPostMetadataSchema, { type: "track" }>, "artists">
		) & {
			cover: SpotifyImageMetadataSchema | null;
			artists: (MusicArtistMetadataSchema & { cover: SpotifyImageMetadataSchema | null })[];
		}
	>[];
}

interface PostEntryProps {
	post: MusicPostPageProps["posts"][number];
}



export const getServerSideProps: GetServerSideProps = async (context) => {
	const { page } = context.query;

	const posts = await fetchMusicInformation({ limit: 12 });

	return { props: { posts: posts.items } };
}
