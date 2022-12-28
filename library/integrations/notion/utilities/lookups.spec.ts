import { expect, it, describe } from "vitest";

import {
	BulletedListItemBlockMock,
	NumberedListItemBlockMock,
	HeadingOneBlockMock,
	ParagraphBlockMock,
	HeadingTwoBlockMock,
	HeadingThreeBlockMock
} from "../mocks/block.mocks";

import { lookupListEndIndex, lookupSectionEndIndex } from "./lookups";

const unorderedListBlockMock = new Array(4).fill(BulletedListItemBlockMock);

const orderedListBlockMock = new Array(5).fill(NumberedListItemBlockMock);

const sectionBlock = [HeadingOneBlockMock, ParagraphBlockMock]

const nestedSectionsBlock = [
	...sectionBlock,
	HeadingTwoBlockMock,
	HeadingThreeBlockMock,
	HeadingOneBlockMock
]

describe("lookupListEndIndex", () => {
	it("Parses list indexes properly for different blocks", () => {
		const unorderedListEndIndex = lookupListEndIndex(0, unorderedListBlockMock);
		const orderedListEndIndex = lookupListEndIndex(0, orderedListBlockMock);

		expect(unorderedListEndIndex).toBe(4);
		expect(orderedListEndIndex).toBe(5);
	});

	it("Will stop when boundary is hit", () => {
		const combinedBlocks = unorderedListBlockMock.concat(orderedListBlockMock);

		const unorderedListEndIndex = lookupListEndIndex(0, combinedBlocks);

		expect(unorderedListEndIndex).toBe(4);
	});
});

describe("lookupSectionEndIndex", () => {
	it("Parses section block from heading", () => {
		const sectionEndIndex = lookupSectionEndIndex(0, sectionBlock);

		expect(sectionEndIndex).toBe(2);
	});

	it("Can parse nested section blocks", () => {
		const firstSectionEnd = lookupSectionEndIndex(0, nestedSectionsBlock);

		const subsectionEnd = lookupSectionEndIndex(2, nestedSectionsBlock);

		const subSubSectionEnd = lookupSectionEndIndex(3, nestedSectionsBlock);

		expect(firstSectionEnd).toBe(4);
		expect(subsectionEnd).toBe(4);
		expect(subSubSectionEnd).toBe(4);
	});
});


