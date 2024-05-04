import path from "path";
import { existsSync } from "fs";

import type { ContentConfig, PostEntry, PostMetadataEntry } from "@/content/types";
/**
 * Helper to create type safe post entries with inference
 * @param config
 * @returns post entry
 */
export const definePostEntry = <T>(config: PostEntry<T>) => config;

/**
 * Helper to create type safe post entry metadata with inference
 * @param config
 * @returns post metadata entry
 */
export const definePostMetadata = <T>(config: PostMetadataEntry<T>) => config;

/**
 * Helper to create type safe content config
 * @param config
 * @returns configuration for content handling
 */
export const defineContentConfig = (config: ContentConfig) => {
	if (!config.entries.length) { throw new Error("No post entries were registered in config"); }

	const metadataEntries = config.entries.map(entry => entry.metadata || []).flat();

	if (metadataEntries.some(
		entry => typeof entry.external === "string" && entry.external.endsWith(".json")
	)) {
		throw new Error("Invalid external path on metadata was added - json format is required");
	}

	return config;
}

/**
 * Get repo content config
 * @returns fetched config
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
