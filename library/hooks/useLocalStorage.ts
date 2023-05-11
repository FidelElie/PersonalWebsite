import { useEffect, useState } from "react";

export const useLocalStorage = <T = JSONParsable>(
	key: string,
	initialValue: JSONParsable = null
) => {
	const [storageValue, setStorageValue] = useState<JSONParsable>();

	const editStorageValue = (value: T) => setStorageValue(value as JSONParsable);

	useEffect(() => {
		if (localStorage) {
			const savedStorageValue = localStorage.getItem(key);

			setStorageValue(savedStorageValue ? JSON.parse(savedStorageValue) : initialValue);
		}
	}, [initialValue, key]);

	useEffect(() => {
		if (storageValue !== undefined) { localStorage.setItem(key, JSON.stringify(storageValue)); }
	}, [storageValue, key]);

	return [
		(storageValue !== undefined ? storageValue : initialValue) as T,
		editStorageValue
	] as const;
}

type JSONPrimitives = string | number | boolean | null;
type JSONObject<T> = { [key: string]: T };
type JSONArray<T> = T[];

type JSONPrimitiveStructs = JSONPrimitives | JSONObject<JSONPrimitives> | JSONArray<JSONPrimitives>;

type JSONParsable = |
	JSONPrimitiveStructs |
	JSONObject<JSONPrimitiveStructs> |
	JSONArray<JSONPrimitiveStructs>;
