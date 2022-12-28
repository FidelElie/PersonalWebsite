import { expect, it, describe } from "vitest";
import createNotionClient from "./createNotionClient";

const mockApiKey = "notionMockApiKey";

const mockDatabases = {
	database1: "database1_id",
	database2: "database2_id"
}

describe("createNotionClient", () => {
	it("Can register corresponding databases", () => {
		const notionClient = createNotionClient(mockApiKey, mockDatabases);

		expect("database1" in notionClient.databases).toBe(true);
		expect("database2" in notionClient.databases).toBe(true);
	});
});
