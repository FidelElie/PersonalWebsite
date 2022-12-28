import { expect, it, describe } from "vitest";

import type { BlockObjectResponse } from "../notion.types";

import {
	isListItemBlock,
	isHeadingBlock,
	isParagraphBlock,
	isCodeBlock,
	getHeadingLevel
} from "./blocks";

const orderedListBlockMock = { type: "numbered_list_item" } as BlockObjectResponse;

const unorderedListBlockMock = { type: "bulleted_list_item" } as BlockObjectResponse;

const headingBlockMocks = new Array(3).fill(null).map((_, index) => ({
	type: `heading_${index + 1}`
})) as { type: "heading_1" | "heading_2" | "heading_3" }[] as BlockObjectResponse[];

const paragraphBlockMock = { type: "paragraph" } as BlockObjectResponse;

const codeBlockMock = { type: "code" } as BlockObjectResponse;

describe("isListItemBlock", () => {
	it("Can identify a ordered list item block", () => {
		expect(isListItemBlock(orderedListBlockMock)).toBe(true);
	});

	it("Can identify a unordered list item block", () => {
		expect(isListItemBlock(unorderedListBlockMock)).toBe(true);
	});
});

describe("isHeadingBlock", () => {
	it("Can identify a heading block", () => {
		expect(isHeadingBlock(headingBlockMocks[0])).toBe(true);
	})
});

describe("isParagraphBlock", () => {
	it("Can identify a paragraph block", () => {
		expect(isParagraphBlock(paragraphBlockMock)).toBe(true);
	});
});

describe("isCodeBlock", () => {
	it("Can identify a code block", () => {
		expect(isCodeBlock(codeBlockMock)).toBe(true);
	})
});

describe("getHeadingLevel", () => {
	it("Can parse a heading tag to its corresponding level", () => {
		expect(getHeadingLevel(headingBlockMocks[0])).toBe(1);
		expect(getHeadingLevel(headingBlockMocks[1])).toBe(2);
		expect(getHeadingLevel(headingBlockMocks[2])).toBe(3);
	});
});

