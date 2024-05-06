import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import type { GetServerSideProps } from "next";
import clsx from "clsx";

import { fetchMusicArtistsWithCovers } from "@/libraries/functions";
import { MusicArtistMetadataSchema, SpotifyImageMetadataSchema } from "@/libraries/schemas";

export default function MusicArtistsPage(props: MusicArtistsPageProps) {
	const { artists } = props;

	return (
		<div className="container max-w-5xl mx-auto px-5 flex flex-col gap-5 pt-5 pb-10">
			<Head>
				<title>Music | FiPE</title>
			</Head>
			<div className="flex flex-wrap w-full flex-grow">
				{ artists.map(artist => <MusicArtistEntry key={artist.slug} artist={artist} />) }
			</div>
		</div>
	)
}

const MusicArtistEntry = (props: MusicArtistEntryProps) => {
	const { artist } = props;

	return (
		<Link
			href={`/music/artists/${artist.slug}`}
			className="group block w-full sm:w-1/2 md:w-1/3 p-1"
		>
			<div className="relative aspect-square rounded-lg border overflow-hidden">
				{
					!!artist.cover && (
						<Image
							src={artist.cover.images[0].url}
							alt={`${artist.name} cover`}
							placeholder="blur"
							blurDataURL={artist.cover.placeholder}
							fill
						/>
					)
				}
				<span className={clsx(
					"absolute w-full bottom-0 py-2 px-3 text-xs text-white bg-gray-900 bg-opacity-50",
					"flex items-center gap-2, transition-all"
				)}>
					{ artist.name }
				</span>
			</div>
		</Link>
	)
}

interface MusicArtistsPageProps {
	artists: (MusicArtistMetadataSchema & { cover: SpotifyImageMetadataSchema | null })[];
}

interface MusicArtistEntryProps {
	artist: MusicArtistsPageProps["artists"][number];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { page } = context.query;

	const artists = await fetchMusicArtistsWithCovers({ limit: 12 });

	return { props: { artists: artists.items } };
}
