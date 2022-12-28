import type { HeadingLevels, BlockObjectResponse } from "../notion.types";

import { NotionBlocks } from "./maps";

export const isListItemBlock = (entry: BlockObjectResponse) => {
	return (
		NotionBlocks.NUMBERED_LIST_ITEM === entry.type ||
		NotionBlocks.BULLETED_LIST_ITEM === entry.type
	)
}

export const isHeadingBlock = (entry: BlockObjectResponse) => {
	return (
		NotionBlocks.HEADING_1 === entry.type ||
		NotionBlocks.HEADING_2 === entry.type ||
		NotionBlocks.HEADING_3 === entry.type
	)
}

export const isParagraphBlock = (entry: BlockObjectResponse) => {
	return NotionBlocks.PARAGRAPH === entry.type;
}

export const isCodeBlock = (entry: BlockObjectResponse) => {
	return NotionBlocks.CODE === entry.type;
}

export const getHeadingLevel = (node: BlockObjectResponse) => {
	return parseInt(node.type.replace("heading_", ""), 10) as HeadingLevels;
}
