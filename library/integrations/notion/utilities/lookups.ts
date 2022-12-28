/**
 * Lookups always take the index after the last block - so can give an index past the length of an
 * array, this is no problem with indexing methods like array.slice
 */
import type { HeadingLevels, BlockObjectResponse } from "../notion.types";

import { getHeadingLevel, isListItemBlock } from "./blocks";

export const lookupListEndIndex = (
	lookupFrom: number,
	blocks: BlockObjectResponse[]
) => {
	const lookupBlock = blocks[lookupFrom];

	if (!isListItemBlock(lookupBlock)) {
		throw new TypeError(`Block is not part of a list got ${lookupBlock.type}`);
	}

	const listEndIndex = blocks.findIndex(
		(block, blockIndex) => blockIndex > lookupFrom && block.type !== lookupBlock.type
	);

	return listEndIndex !== -1 ? listEndIndex : blocks.length;
}

export const lookupSectionEndIndex = (
	lookupFrom: number,
	entries: BlockObjectResponse[]
) => {
	const matchesBoundary = (levelA: HeadingLevels, levelB: HeadingLevels) => {
		switch (levelA) {
			case 1:
				return levelB === 1;
			case 2:
				return levelB === 1 || levelB === 2;
			case 3:
				return true;
			default:
				return false;
		}
	}

	const lookupFromLevel = getHeadingLevel(entries[lookupFrom]);

	const lookupIndex = entries.findIndex(
		(node, nodeIndex) => nodeIndex > lookupFrom && matchesBoundary(lookupFromLevel, getHeadingLevel(node))
	)

	return lookupIndex !== -1 ? lookupIndex : entries.length;
}
