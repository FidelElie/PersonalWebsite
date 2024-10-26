import parse5 from "parse5";
import { visit } from "unist-util-visit";
import { fromParse5 } from "hast-util-from-parse5";
import type { Paragraph, Root, Html } from "mdast";

import type { PromiseOrNot } from "@/libraries/types";

type RegExpDirective<T> = {
	identifier: RegExp | string;
	onMatch: (match: RegExpMatchArray) => PromiseOrNot<T>;
	getHTML: (matchResult: NoInfer<T>) => PromiseOrNot<string | undefined | null>;
}

/**
 *
 * @param htmlString
 * @returns
 */
const HTMLToHast = async (htmlString: string) => {
	return (fromParse5(parse5.parseFragment(htmlString)) as Root).children[0] as Html;
}

/**
 * Helper to create regexp directive transformer to register with plugin
 * @param directive
 * @returns
 */
export const createRegExpDirective = <T,>(directive: RegExpDirective<T>) => {
	const { identifier } = directive;

	if (typeof identifier !== "string" && identifier instanceof RegExp) {
		throw new Error("Directive identifier must be of type string or RegExp");
	}

	return directive;
}

/**
 *
 * @param directives
 * @returns
 */
export const remarkRegExpDirective = (directives: RegExpDirective<unknown>[]) => {
	const standardisedDirectives = directives.map(directive => {
		const { identifier } = directive;

		return {
			...directive,
			identifier: typeof identifier === "string" ? new RegExp(identifier) : identifier
		}
	});

	return async function transformer(tree: Root) {
		const paragraphs: Paragraph[] = [];

		visit(tree, "paragraph", function (node) { paragraphs.push(node); });

		const promises = await Promise.all(
			paragraphs.map(
				async (node) => {
					const { children } = node;

					const mappedChildren = await Promise.all(
						children.map(async child => {
							if (child.type !== "text") { return [child]; }

							const directiveMatches = await Promise.all(
								standardisedDirectives.map(
									async directive => {
										const paragraphs = Array.from(
											child.value.matchAll(directive.identifier)
										);

										return Promise.all(
											paragraphs.map(
												async match => {
													const html = await directive.getHTML(await directive.onMatch(match));

													if (!html) { return []; }

													return {
														directive: match[0],
														index: match.index,
														ast: await HTMLToHast(html)
													}
												}
											)
										);
									}
								)
							);

							const flattened = directiveMatches.flat().flat();

							if (!flattened.length) { return []; }

							const flattenedMatches = flattened.toSorted(
								(matchA, matchB) => matchB.index - matchA.index
							);

							const uniqueIdentifiers = Array.from(
								new Set(flattenedMatches.map(match => match.directive))
							);

							const splitRegexp = new RegExp(`${uniqueIdentifiers.join("|")}`);

							const split = child.value.split(splitRegexp);

							const reformedAST = split.reduce(
								(tree, string, treeIndex) => {
									tree.push({ type: "text", value: string });

									const directive = flattenedMatches[treeIndex];

									if (!directive) { return tree; }

									tree.push(directive.ast);

									return tree;
								},
								[] as typeof children
							);

							return reformedAST;
						})
					);

					node.children = mappedChildren.flat();
				}
			)
		);

		await Promise.all(promises);

		return tree;
	}
}
