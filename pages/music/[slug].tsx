import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkEmbedder from "@remark-embedder/core";
import { serialize } from "next-mdx-remote/serialize";

import MusicMeta from "@/posts/music.meta.json";

import { parseCMSPaths } from "@/content/next";
import { ContentPost } from "@/content/types";

import {
	MusicArtistMetadataSchema,
	MusicPostMetadataSchema,
	SpotifyImageMetadataSchema
} from "@/libraries/schemas";
import { fetchMusicPostInformationBySlug } from "@/libraries/functions";
import { YoutubeEmbedTransformer, remarkRegExpDirective } from "@/libraries/plugins";
import { EmbedDirective, MusicPostDirective } from "@/libraries/plugins/directives";

import { MusicBookmark } from "@/components/interfaces";

const components = {
	MusicBookmark
}

export default function MusicPostPage(props: MusicPostProps) {
	const { source, post: { metadata, publishedAt } } = props;

	const firstArtist = metadata.artists[0];
	const firstImageCover = metadata.cover;

	return (
		<main className="container max-w-5xl mx-auto py-5 px-5 flex flex-col gap-5 sm:gap-10 sm:flex-row">
			<Head>
				<title>{`${firstArtist.name} - ${metadata.name} | FiPE`}</title>
			</Head>
			<aside className="sm:w-1/3 flex-shrink-0 h-min sm:sticky top-5">
				<div className="relative aspect-square border mb-3">
					{
						firstImageCover && (
							<Image
								src={firstImageCover.images[0].url}
								alt={`${metadata.name} cover`}
								placeholder="blur"
								className="rounded"
								blurDataURL={firstImageCover.placeholder}
								fill
							/>
						)
					}
				</div>
				<div className="flex flex-col items-end w-full">
					<ul className="text-right space-y-2 font-light w-full">
						<li><Link href="/music" className="text-sm">Back to music</Link></li>
						<li><hr className="w-full" /></li>
						<li>{metadata.type === "album" ? "LP" : "Single"}</li>
						<li>{metadata.release}</li>
						<li>{Math.ceil(metadata.duration / 1000 / 60)} mins</li>
						{ !!metadata.genres.length && <li>{metadata.genres.join(", ")}</li> }
					</ul>
				</div>
			</aside>
			<article className="sm:w-2/3">
				<section className="mb-4">
					<Link
						href={`/music/artists/${firstArtist.slug}`}
						aria-label={`${firstArtist.name} Artist Page`}
						className="text-xl font-extra flex items-center gap-2"
					>
						<div className="h-12 w-12 rounded-full border relative overflow-hidden">
							{
								firstArtist.cover && (
									<Image
										src={firstArtist.cover.images[0].url}
										alt={`${firstArtist.name} avatar`}
										placeholder="blur"
										blurDataURL={firstArtist.cover.placeholder}
										fill
									/>
								)
							}
						</div>
						<h2 className="font-light">{firstArtist.name}</h2>
					</Link>
					<h1 className="text-5xl">{metadata.name}</h1>
					{
						publishedAt && (
							<span className="text-sm font-light mt-1">
								Published on {new Date(publishedAt).toLocaleDateString()}
							</span>
						)
					}
					{
						metadata.type === "album" && (
							<p className="mt-2 text-gray-500 font-light">
								Favourite Songs: { metadata.tracks.filter(track => track.favourite).map(favourite => favourite.name).join(", ") }
							</p>
						)
					}
				</section>
				<div className="font-light space-y-6 prose">
					<MDXRemote {...source} components={components}/>
				</div>
			</article>
		</main>
	);
}

interface MusicPostProps {
	source: MDXRemoteSerializeResult;
	post: ContentPost<
		(
			Omit<Extract<MusicPostMetadataSchema, { type: "album" }>, "artists"> |
			Omit<Extract<MusicPostMetadataSchema, { type: "track" }>, "artists">
		) & {
			cover: SpotifyImageMetadataSchema | null;
			artists: (MusicArtistMetadataSchema & { cover: SpotifyImageMetadataSchema | null })[]
		}
	>;
}

export const getStaticProps: GetStaticProps<MusicPostProps, { slug: string }> = async (context) => {
	const { params } = context;

	if (!params?.slug) {
		return { redirect: { destination: "/music", permanent: false } };
	}

	const post = await fetchMusicPostInformationBySlug(params?.slug);

	if (!post) { return { redirect: { destination: "/music", permanent: false } }; }

	const source = await serialize(
		post.content || "",
		{
			mdxOptions: {
				remarkPlugins: [
					[
						remarkRegExpDirective,
						[MusicPostDirective, EmbedDirective]
					],
					// [
					// 	remarkEmbedder,
					// 	{ transformers: [YoutubeEmbedTransformer] }
					// ],
				]
			},
			scope: post.metadata
		}
	);

	return { props: { source, post } };
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await parseCMSPaths({ path: "./posts/music", meta: MusicMeta.entries })

	return { paths, fallback: false };
}
