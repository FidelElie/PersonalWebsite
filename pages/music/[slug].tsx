import Head from "next/head";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import MusicMeta from "@/posts/music.meta.json";

import { MusicPostSchema } from "@/libraries/schemas";
import { parseCMSContent, parseCMSPaths } from "@/content/next";

export default function MusicPostPage(props: MusicPostProps) {
	const { source, metadata } = props;

	const firstArtist = metadata.artists[0];
	const firstImage = metadata.images[0];

	return (
		<main className="container max-w-4xl mx-auto py-5 px-5 flex flex-col gap-5 sm:gap-10 sm:flex-row">
			{/* <Head>
				<title>{firstArtist.name} - {metadata.name} | FiPE</title>
			</Head> */}
			<aside className="sm:w-1/3 flex-shrink-0 h-min sm:sticky top-0">
				<div className="relative aspect-square rounded-lg overflow-hidden border mb-3">
					<Image src={firstImage.url} alt={`${metadata.name} cover`} fill/>
				</div>
				<div className="flex flex-col items-end">
					<ul className="text-right space-y-2">
						<li>{metadata.type === "album" ? "LP" : "Single"}</li>
						<li>{new Date(metadata.release).toLocaleDateString()}</li>
					</ul>
				</div>
			</aside>
			<article className="sm:w-2/3">
				<section className="mb-4">
					<span className="text-xl font-extra flex items-center">
						<div className="h-7 w-7 rounded-full border mr-2">

						</div>
						{/* {firstArtist.name} */}
					</span>
					<h1 className="text-5xl">{metadata.name}</h1>
					{
						metadata.type === "album" && (
							<p className="mt-2 text-gray-500 font-light">
								Favourite Songs: { metadata.favourites.map(favourite => favourite.name).join(", ") }
							</p>
						)
					}
				</section>
				<div className="font-light space-y-6">
					<MDXRemote {...source} />
				</div>
			</article>
		</main>
	);
}

interface MusicPostProps {
	source: MDXRemoteSerializeResult;
	metadata: MusicPostSchema;
}

export const getStaticProps: GetStaticProps<MusicPostProps, { slug: string }> = async (context) => {
	const { params } = context;

	const props = await parseCMSContent({ slug: params?.slug, meta: MusicMeta.entries });

	console.log(props);

	if (!props) { return { redirect: { destination: "/music", permanent: false } }; }

	return { props: { ...props, metadata: MusicPostSchema.parse(props.metadata) } };
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await parseCMSPaths({ path: "./music", meta: MusicMeta.entries })

	return { paths, fallback: false };
}
