import { expect, it, describe } from "vitest";

import { getPropertyValue } from "./getters";

describe("getPropertyValue", () => {
	it("Can get title property", () => {
		const mockTitleProperty = { type: "title", title: [{ plain_text: "Title Text" }] };

		const propertyValue = getPropertyValue(mockTitleProperty as any);

		expect(propertyValue).toBe("Title Text");
	});

	it("Can parse a fallback if no value property was found", () => {
		const mockToFallbackFrom = { type: "title", title: undefined }

		const fallbackValue = "fallback_value";

		const propertyValue = getPropertyValue(mockToFallbackFrom as any, fallbackValue);

		expect(propertyValue).toBe(fallbackValue);
	});
});
