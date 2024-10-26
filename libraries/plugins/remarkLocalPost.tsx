import { visit } from "unist-util-visit";

import type { Root } from "mdast";
import path from "path";
import {
	fetchMusicArtistBySpotifyID,
	fetchMusicCoverBySlug,
	fetchMusicPostBySlug,
	fetchMusicPostInformationBySlug
} from "@/libraries/functions";

const LINK_IDENTIFIER = /:post\[.*?\]/g;

export const remarkLocalPost = ()  => {
	return async function transformer(tree: Root) {
		visit(tree, "paragraph", function (node) {
			const { children } = node;

			const mappedChildren = children.map(child => {
				if (child.type !== "text") { return [child]; }

				const postLinks = Array.from(child.value.matchAll(LINK_IDENTIFIER));

				if (!postLinks.length) { return [child]; }

				 const astSplit = child.value.split(LINK_IDENTIFIER);

				 const added = astSplit.reduce((tree, string, treeIndex) => {
						tree.push({
							type: "text",
							value: string,
						});

						const link = postLinks[treeIndex];

						if (!link) { return tree; }

						const replacedLink = link[0].replace(":post[", "").replace("]", "");

						const slugName = path.basename(replacedLink);

						// const post = fetchMusicPostInformationBySlug(slugName);

						const correspondingPost = fetchMusicPostBySlug(slugName);

						if (!correspondingPost) { return tree; }

						const correspondingArtist = fetchMusicArtistBySpotifyID(
							correspondingPost.metadata.artists[0]
						);

						const postCover = fetchMusicCoverBySlug(correspondingPost.slug);

						const coverImage = postCover?.images[0].url;

						tree.push({
							type: "mdxJsxTextElement",
							name: "MusicBookmark",
							attributes: [
								// {
								// 	type: "mdxJsxExpressionAttribute",
								// 	value: "post",
								// 	data: {
								// 		estree: {
								// 			type: "Program",
								// 			sourceType: "module",
								// 			body: [
								// 				{
								// 					type: ""
								// 				}
								// 			]
								// 		}
								// 	}
								// },
								// {
								// 	type: "mdxJsxAttribute",
								// 	name: "post",
								// 	value: "post",
								// 	// data: {
								// 	// 	estree: post
								// 	// }
								// },
								{ type: "mdxJsxAttribute", name: "slug", value: replacedLink },
								{ type: "mdxJsxAttribute", name: "name", value: correspondingPost?.metadata.name },
								{ type: "mdxJsxAttribute", name: "artist", value: correspondingArtist?.name || "" },
								{ type: "mdxJsxAttribute", name: "cover", value: coverImage },
								{ type: "mdxJsxAttribute", name: "rating", value: correspondingPost?.metadata.rating },
								{ type: "mdxJsxAttribute", name: "type", value: correspondingPost?.metadata.type }
							],
							children: []
						})

						return tree;
					}, [] as typeof children
				);

				return added;
			}).flat();

			node.children = mappedChildren;
		});
	}
}
