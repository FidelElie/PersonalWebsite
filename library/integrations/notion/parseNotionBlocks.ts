import type { BlockObjectResponse, ParsingMap, SimpleBlock } from "./notion.types";

import { lookupListEndIndex, lookupSectionEndIndex } from "./utilities/lookups";

import { isHeadingBlock, isListItemBlock } from "./utilities/blocks";
import {
	generateParsingMap,
	generateContentMap,
	SimpleBlocks
} from "./utilities/maps";

const parseNotionBlocks = (blocks: BlockObjectResponse[]) => {
	const indexedBlocks = blocks.map((block, blockIndex) => {
		const previousBlock = blocks[blockIndex - 1];

		if (isListItemBlock(block) && (!previousBlock || !isListItemBlock(previousBlock))) {
			return generateParsingMap(block, blockIndex, lookupListEndIndex(blockIndex, blocks));
		} else if (isHeadingBlock(block)) {
			return generateParsingMap(block, blockIndex, lookupSectionEndIndex(blockIndex, blocks));
		} else if (!isListItemBlock(block) && !isHeadingBlock(block)) {
			return generateParsingMap(block, blockIndex);
		} else {
			return null;
		}
	}).filter(block => !!block) as ParsingMap[];

	let structs: SimpleBlock[] = [];

	indexedBlocks.forEach((block, blockIndex) => {
		const maximumIndex = getMaximumBlockIndex(structs);

		const validIndex = !!maximumIndex || maximumIndex === 0;

		if (validIndex && (block.end ? block.end : block.start) <= maximumIndex) { return; }

		if (block.type === SimpleBlocks.SECTION) {
			let contents = blocks.slice(block.start, block.end!);

			const sectionContent = generateContentMap(contents.shift()!);

			structs.push({
				...block,
				content: sectionContent,
				contents: parseNotionBlocks(contents)
			} as any);
		} else if (block.type === SimpleBlocks.LIST) {
			const contents = blocks.slice(block.start, block.end)
				.map(node => generateContentMap(node));

			structs.push({ ...block, contents } as any);
		} else {
			const content = generateContentMap(blocks[block.start]);
			structs.push({ ...block , content } as any);
		}
	});


	return structs;
}

const getMaximumBlockIndex = (structs: SimpleBlock[]) => {
	const indexes = structs.map(struct => struct.end ? struct.end : struct.start);

	const maximumIndex = indexes.length ? Math.max(...indexes) : null;

	return maximumIndex;
}

export default parseNotionBlocks;
