import { expect, it, describe } from "vitest";

import { numberArray } from "./numberArray";

describe("numberArray", () => {
	it("Will create an arbitrary numbered array inclusive of max", () => {
		const numberedArray = numberArray(0, 5);

		expect(numberedArray.at(0)).toBe(0);
		expect(numberedArray.at(-1)).toBe(4);
	});

	it("Will create an arbitrary numbered array exclusive of max", () => {
		const numberedArray = numberArray(0, 5, { exclusive: true });

		expect(numberedArray.at(0)).toBe(0);
		expect(numberedArray.at(-1)).toBe(5);
	});

	it("Will create a numbered array with different step between each value", () => {
		const numberedArray = numberArray(0, 20, { step: 2 });

		expect(numberedArray.length).toBe(10);
		expect(numberedArray.at(0)).toBe(0);
		expect(numberedArray.at(-1)).toBe(18);
	});

	it("Can do it for large ranges", () => {
		const numberedArray = numberArray(1975, 2050);

		expect(numberedArray.length).toBe(75);
	});
})
