import { expect, it, describe } from "vitest";
import util from "util";

import {
	BulletedListItemBlockMock,
	ParagraphBlockMock,
	HeadingOneBlockMock,
} from "./mocks/block.mocks";
import { SimpleBlock } from "./notion.types";

import parseNotionBlocks from "./parseNotionBlocks";

const	detailedLog = (input: any) => {
	console.log(util.inspect(input, { depth: null, colors: true }));
}

describe("parseNotionBlocks", () => {
	it("Can parse a paragraph block", () => {
		const [paragraphBlock] = parseNotionBlocks([ParagraphBlockMock]);

		expect(paragraphBlock.type).toBe("paragraph");
		expect(paragraphBlock.content).not.toBe(null);
		expect(paragraphBlock.content).not.toBe(undefined);
	});

	it("Can parse blocks to a list", () => {
		const [listBlock] = parseNotionBlocks([
			BulletedListItemBlockMock,
			BulletedListItemBlockMock,
			BulletedListItemBlockMock,
			BulletedListItemBlockMock
		]);

		expect(listBlock.type).toBe("list");
		expect(listBlock.contents).not.toBe(undefined);
		expect(listBlock.contents.length).toBe(4);
	});

	it("Can parse heading block to section", () => {
		const [sectionBlock] = parseNotionBlocks([HeadingOneBlockMock]);

		expect(sectionBlock.type).toBe("section");
		expect(sectionBlock.content).not.toBe(null);
		expect(sectionBlock.content).toBe("Introduction");
		expect(sectionBlock.contents).not.toBe(undefined);
		expect(sectionBlock.contents.length).toBe(0);
	});

	it("Can parse a section block with its content", () => {
		const blocks = parseNotionBlocks([HeadingOneBlockMock, ParagraphBlockMock]);

		detailedLog(blocks);

		expect(blocks.length).toBe(1);
		expect(blocks[0].content).toBe("Introduction");
		expect(blocks[0].contents.length).toBe(1);
		expect((blocks[0].contents[0] as SimpleBlock).type).toBe("paragraph");

	})
});
