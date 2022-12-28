import { expect, it, describe } from "vitest";

import {
	BulletedListItemBlockMock,
	HeadingOneBlockMock,
	HeadingTwoBlockMock,
	HeadingThreeBlockMock,
	ImageBlockMock,
	NumberedListItemBlockMock,
	ParagraphBlockMock
} from "../mocks/block.mocks";

import { generateParsingMap } from "./maps";

describe("generateParsingMap", () => {
	it("Can parse a heading blocks", () => {
		const headingOneMap = generateParsingMap(HeadingOneBlockMock, 0, 5);
		const headingTwoMap = generateParsingMap(HeadingTwoBlockMock, 0, 6);
		const headingThreeMap = generateParsingMap(HeadingThreeBlockMock, 1, 5)

		expect(headingOneMap).toMatchObject({ type: "section", start: 0, level: 1, end: 5 });
		expect(headingTwoMap).toMatchObject({ type: "section", start: 0, end: 6 });
		expect(headingThreeMap).toMatchObject({ type: "section", start: 1, end: 5 });
	});

	it("Can parse image blocks", () => {
		const parsingMap = generateParsingMap(ImageBlockMock, 0);

		expect(parsingMap).toMatchObject({ type: "image", start: 0 });
	});

	it("Can parse paragraph blocks", () => {
		const parsingMap = generateParsingMap(ParagraphBlockMock, 0);

		expect(parsingMap).toMatchObject({ type: "paragraph", start: 0 });
	});

	it("Can parse list blocks", () => {
		const bulletedListMap = generateParsingMap(BulletedListItemBlockMock, 0, 4);

		const numberedListMap = generateParsingMap(NumberedListItemBlockMock, 0, 6);

		expect(bulletedListMap).toMatchObject({ type: "list", start: 0, end: 4, ordered: false });
		expect(numberedListMap).toMatchObject({ type: "list", start: 0, end: 6, ordered: true });
	});
});
