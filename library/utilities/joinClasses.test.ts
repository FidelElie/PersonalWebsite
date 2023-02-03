import { describe, expect, it } from "vitest";

import joinClasses from "./joinClasses";

describe("joinClasses", () => {
	it("Can parse strings to classes", () => {
		expect(joinClasses("sy-2", "sx-3")).toBe("sy-2 sx-3");
	});

	it("Can parse numbers to class string", () => {
		expect(joinClasses("sy-2", 1)).toBe("sy-2 1");
	});

	it("Will not return falsy values", () => {
		expect(joinClasses("sy-2", 0, null)).toBe("sy-2");
	});

	it("Can parse object of class keys", () => {
		expect(joinClasses({ "sy-2": true, "l-4": false })).toBe("sy-2");
	});

	it("Can parse an array of classes", () => {
		expect(joinClasses(["sy-2", 0, "true"])).toBe("sy-2 true");
	});

	it("Can parse classes of multiple types", () => {
		expect(joinClasses(["sy-2", 0], { "l-3": true, "l-4": false }, "sx-4")).toBe("sy-2 l-3 sx-4");
	});

	it("Will parse conditionals", () => {
		expect(joinClasses(
			true && "sy-2",
			false ? "r-4" : "l-4"
		)).toBe("sy-2 l-4")
	});

	it("Will properly parse object", () => {

	});
});
