import { visit } from "unist-util-visit";

import type { Root } from "mdast";

export const remarkLocalPost = ()  => {
	return async function transformer(tree: Root) {
		visit(tree, "text", function (node) {
			const postLinks = Array.from(node.value.matchAll(/#\[(.*?)\]/g));

			if (!postLinks.length) { return; }

			for (const link of postLinks) {
				const createdLink = `<Link href="${link[1]}">${link[1]}</Link>`;

				node.value = node.value.replaceAll(link[0], createdLink)
			}
		});
	}
}
