import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";

import useLocalStorage from "./useLocalStorage";

const TEST_KEY = "test";

const fetchCurrentLocalStorageValue = () => window.localStorage.getItem(TEST_KEY);

describe("useLocalStorage", () => {
	it("Should set the initial value to storage", () => {
		const { result } = renderHook(() => useLocalStorage(TEST_KEY));

		const expectedValue = null;

		expect(result.current[0]).toBe(expectedValue);
		expect(fetchCurrentLocalStorageValue()).toBe(JSON.stringify(expectedValue));
	});

	it("Can set a new value after the fact", () => {
		const { result } = renderHook(() => useLocalStorage<{ text: string }>(TEST_KEY));

		const expectedValue = { text: "Hello World" };

		act(() => { result.current[1]({ text: "Hello World" }); });

		expect(result.current[0]).toStrictEqual(expectedValue);
		expect(fetchCurrentLocalStorageValue()).toBe(JSON.stringify(expectedValue));
	});

	it("Will set initial value upon invocation", () => {
		const { result } = renderHook(() => useLocalStorage(TEST_KEY, { text: "Hello World" }));

		const expectedValue = { text: "Hello World" };

		expect(result.current[0]).toStrictEqual(expectedValue);
		expect(fetchCurrentLocalStorageValue()).toBe(JSON.stringify(expectedValue));
	});
});


