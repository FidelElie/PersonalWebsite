import type { BlockObjectResponse } from "../notion.types";
import type { ParsingMap } from "../notion.types";

import { getHeadingLevel } from "./blocks";

export const NotionBlocks = {
	PARAGRAPH: "paragraph",
	HEADING_1: "heading_1",
	HEADING_2: "heading_2",
	HEADING_3: "heading_3",
	CALLOUT: "callout",
	QUOTE: "quote",
	BULLETED_LIST_ITEM: "bulleted_list_item",
	NUMBERED_LIST_ITEM: "numbered_list_item",
	TO_DO: "to_do",
	TOGGLE: "toggle",
	CODE: "code",
	CHILD_PAGE: "child_page",
	CHILD_DATABASE: "child_database",
	EMBED: "embed",
	IMAGE: "image",
	VIDEO: "video",
	FILE: "file",
	PDF: "pdf",
	BOOKMARK: "bookmark",
	EQUATION: "equation",
	DIVIDER: "divider",
	TABLE_OF_CONTENTS: "table_of_contents",
	BREADCRUMB: "breadcrumb",
	COLUMN_LIST: "column_list",
	LINK_PREVIEW: "link_preview",
	TEMPLATE: "template",
	LINK_TO_PAGE: "link_to_page",
	SYNCED_BLOCK: "synced_block",
	TABLE_BLOCK: "table_block",
	TABLE_ROW: "table_row"
} as const;

export const SimpleBlocks = {
	SECTION: "section",
	PARAGRAPH: "paragraph",
	LIST: "list",
	IMAGE: "image"
} as const;

export const generateParsingMap = (
	entry: BlockObjectResponse,
	start: number,
	end?: number
): ParsingMap => {
	switch (entry.type) {
		case NotionBlocks.HEADING_1:
		case NotionBlocks.HEADING_2:
		case NotionBlocks.HEADING_3:
			return { type: "section", start, end: end!, level: getHeadingLevel(entry) };
		case NotionBlocks.IMAGE:
			return { type: "image", start, end: start + 1 };
		case NotionBlocks.NUMBERED_LIST_ITEM:
		case NotionBlocks.BULLETED_LIST_ITEM:
			return { type: "list", start, end: end!, ordered: entry.type.startsWith("numbered") };
		case NotionBlocks.PARAGRAPH:
			return { type: "paragraph", start, end: start + 1 };
		default:
			throw new Error(`Cannot create Parsing Map from type, got type ${entry.type}`)
	}
}

export const generateContentMap = (entry: BlockObjectResponse): string => {
	switch(entry.type) {
		case "heading_1":
			const heading1 = entry.heading_1;
			const heading1HasContent = heading1.rich_text && heading1.rich_text.length;
			return (heading1HasContent ? heading1.rich_text : [{ rich_text: "" }])[0].plain_text!;
		case "heading_2":
			const heading2 = entry.heading_2;
			const heading2HasContent = heading2.rich_text && heading2.rich_text.length;
			return (heading2HasContent ? heading2.rich_text : [{ rich_text: "" }])[0].plain_text!;
		case "heading_3":
			const heading3 = entry.heading_3;
			const heading3HasContent = heading3.rich_text && heading3.rich_text.length;
			return (heading3HasContent ? heading3.rich_text : [{ rich_text: "" }])[0].plain_text!;
		case "numbered_list_item":
			const numberedList = entry.numbered_list_item;
			const numberedListHasContent = numberedList.rich_text && numberedList.rich_text.length;
			return (numberedListHasContent ? numberedList.rich_text : [{ rich_text: "" }])[0].plain_text!;
		case "paragraph":
			const paragraph = entry.paragraph;
			const paragraphHasContent = paragraph.rich_text && paragraph.rich_text.length;
			return (paragraphHasContent ? paragraph.rich_text : [{ rich_text: "" }])[0].plain_text!;
		case "bulleted_list_item":
			const bulletedList = entry.bulleted_list_item;
			const bulletedListHasContent = bulletedList.rich_text && bulletedList.rich_text.length;
			return (bulletedListHasContent ? bulletedList.rich_text : [{ rich_text: "" }])[0].plain_text!;
		case "image":
			const image = entry.image;
			return (image as any).external.url;

		default:
			throw new Error(`Unsupported type ${entry.type}`);
	}
}
