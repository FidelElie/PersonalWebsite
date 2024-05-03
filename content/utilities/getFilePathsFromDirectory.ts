import path from "path";
import fs from "fs/promises";

import type { PromiseOrNot } from "@/libraries/types";
import { ensureDirExists } from "@/content/utilities/ensureDirExists";

/**
 * Get all file paths starting from a given directory recursively
 * @param config path to object (required), if search is recursive (default true) and
 * using an optional transform the string output
 * @returns array of file path
 */
export const getFilePathsFromDirectory = async <T = string>(
	config: { path: string; recursive?: boolean; transform?: (path: string) => PromiseOrNot<T> }
): Promise<T[]> => {
	const { path: basePath, recursive, transform } = config;

	await ensureDirExists(basePath);

	const dirEntries = await fs.readdir(basePath);

	const values = (await Promise.all(
		dirEntries.map(async entry => {
			const entryPath = path.join(basePath, entry);

			await ensureDirExists(entryPath);

			if ((await fs.lstat(entryPath)).isDirectory()) {
				return recursive ? getFilePathsFromDirectory({ ...config, path: entryPath }) : [];
			}

			return transform ? await transform(entryPath) : entryPath;
		})
	)).flat();

	return values as T[];
}
