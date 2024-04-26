import path from "path";
import fs from "fs/promises";

import type { GenericObject } from "@/libraries/types";

import { ensureDirExists } from "@/content/utilities";
import { DEFAULT_CONTENT_CONFIG } from "@/content/config";
import type { ContentConfig, MetaPostEntry, PostEntry } from "@/content/types";

export const writePostMetadata = async (
	context: {
		entry: PostEntry;
		entries: MetaPostEntry[];
		metadata?: GenericObject;
		config: ContentConfig;
	}
) => {
	const { entry, entries, config, metadata } = context;

	const { posts } = config;

	const format = posts?.metadataFormat || DEFAULT_CONTENT_CONFIG.posts.metadataFormat;

	const directoryPath = path.join(
		entry.path || posts?.postsDir || DEFAULT_CONTENT_CONFIG.posts.postsDir,
		 entry.id
	);

	const outputPath = path.join(
		posts?.metadataDir || directoryPath,
		`${entry.id}.meta.${format}`
	);

	const validatedEntries = entries.map(
		input => {
			return entry.validator ? {
				...input,
				metadata: entry.validator(input.metadata)
			} : input;
		}
	);

	const value = { entries: validatedEntries, metadata };

	const output = (() => {
		const jsonOutput = JSON.stringify(value, null, 2);

		switch (format) {
			case "js":
			case "ts":
				`export const ${entry.id}Meta = ${jsonOutput}${format === "ts" ? " as const" : ""}`
			case "json":
				return jsonOutput
			default:
				throw new Error(`Unknown metadata format provided, got ${format}`)
		}
	})();

	await ensureDirExists(path.dirname(outputPath));

	await fs.writeFile(outputPath, output);
}
