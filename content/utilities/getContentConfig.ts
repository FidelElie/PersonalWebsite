import path from "path";
import { existsSync } from "fs";

import type { ContentConfig } from "@/content/types";

/**
 *
 * @returns
 */
export const getContentConfig = async () => {
	const root = process.cwd();

	const configPath = path.join(root, "content.config.ts");

	if (!existsSync(configPath)) {
		throw new Error("content.config.ts is not found - create file in root directory");
	}

	const config = (await import(configPath)).default as ContentConfig;

	if (!config) {
		throw new Error("Couldn't find config - Did you forget the default export in content.config.ts")
	}

	return config;
}
