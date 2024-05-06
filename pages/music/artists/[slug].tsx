import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";

import { fetchMusicArtistInformationBySlug, fetchMusicArtists } from "@/libraries/functions";
import {
	MusicArtistMetadataSchema,
	MusicPostMetadataSchema,
	SpotifyImageMetadataSchema
} from "@/libraries/schemas";
import { ContentPost } from "@/content/types";

export default function MusicArtistPage(props: MusicArtistPageProps) {
	const { artist } = props;

	return (
		<div
			className="container flex flex-col max-w-5xl mx-auto py-5 px-5  gap-5 sm:gap-10 sm:flex-row"
		>
			<Head>
				<title>{`${artist.name} | Music | FiPE`}</title>
			</Head>
			<aside className="sm:w-1/4 flex-shrink-0 h-min sm:sticky top-5">
				<div className="relative aspect-square border mb-3">
					{
						artist.cover && (
							<Image
								src={artist.cover.images[0].url}
								alt={artist.name}
								className="rounded"
								placeholder="blur"
								blurDataURL={artist.cover.placeholder}
								fill
							/>
						)
					}
				</div>
				<Link href="/music/artists" className="text-sm mt-2 block">Back to artists</Link>
			</aside>
			<div className="sm:w-3/4">
				<h1 className="text-5xl">{artist.name}</h1>
				<p className="mt-2 text-gray-500 font-light">
					{artist.genres.join(", ")}
				</p>
				<div className="mt-5">
					{
						artist.posts.map(post => (
							<Link
								key={post.slug}
								href={`/music/${post.slug}`}
								className="border p-4 rounded gap-5 flex flex-col w-full sm:flex-row"
							>
								<div className="w-32 h-32 aspect-square relative">
									{
										post.metadata.cover && (
											<Image
												src={post.metadata.cover.images[0].url}
												alt={post.metadata.name}
												placeholder="blur"
												blurDataURL={post.metadata.cover.placeholder}
												className="rounded border"
												fill
											/>
										)
									}
								</div>
								<div className="font-light">
									<h2 className="text-3xl mb-2 font-normal">{post.metadata.name}</h2>
									<p>{post.metadata.type}</p>
									<p>{post.metadata.rating}</p>
								</div>
							</Link>
						))
					}
				</div>
			</div>
		</div>
	)
}

interface MusicArtistPageProps {
	artist: MusicArtistMetadataSchema & {
		cover: SpotifyImageMetadataSchema | null;
		posts: ContentPost<(MusicPostMetadataSchema & { cover: SpotifyImageMetadataSchema | null; })>[]
	};
}

export const getStaticProps: GetStaticProps<
	MusicArtistPageProps,
	{ slug: string }
> = async (context) => {
	const { params } = context;

	if (!params?.slug) {
		return { redirect: { destination: "/artists", permanent: false } };
	}

	const musicArtistInformation = await fetchMusicArtistInformationBySlug(params.slug);

	if (!musicArtistInformation) {
		return { redirect: { destination: "/artists", permanent: false } };
	}

	return { props: { artist: musicArtistInformation } };
}

export const getStaticPaths: GetStaticPaths = async () => {
	const pathsFromQuery = await fetchMusicArtists({
		transform: (artists) => artists.map(artist => ({ params: { slug: artist.slug }}))
	});

	return { paths: pathsFromQuery.items, fallback: false };
}
