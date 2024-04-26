import Head from "next/head";
import type { GetStaticProps } from "next";

export default function MusicPosts(props: MusicPostsProps) {
	const {} = props;

	return (
		<main className="container max-w-5xl mx-auto py-5 px-5 md:px-0">
			<Head>
				<title>Music | FiPE</title>
			</Head>
		</main>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	return { props: { } };
}

interface MusicPostsProps {

}
