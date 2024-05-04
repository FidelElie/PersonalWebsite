import path from "path";

import { mergeObjects } from "@/libraries/utilities";

import { ContentConfig } from "@/content/types";
import { MetaFile, PostFile } from "@/content/core";
import { DEFAULT_CONTENT_CONFIG } from "@/content/defaults";
import { getFilePathsFromDirectory } from "@/content/utilities";

export const resolveCurrentMetadata = async (contentConfig: ContentConfig, postIds?: string[]) => {
	const config = mergeObjects(DEFAULT_CONTENT_CONFIG, contentConfig);

	const {
		debug,
		entries,
		posts: {
			postsDir,
			metadataDir
		},
	} = config;

	await Promise.all(
		(entries).map(async entry => {
			if (postIds && !postIds.includes(entry.id)) {
				if (debug) { console.log(`Resolution skipped with id ${entry.id}`); }
				return null;
			}

			const directoryPath = path.join(postsDir, entry.id);

			const postPaths = await getFilePathsFromDirectory({ path: directoryPath, recursive: true });

			const { meta: metadata } = await MetaFile.readPostMeta({ entry, config });

			const entriesMap = new Map(metadata.entries.map(entry => [entry.path, entry]));

			const entryPaths = entries.map(
				entry => ({ ...entry, basePath: path.join(postsDir, entry.id) })
			);

			const entriesToCreate = (
				await Promise.all(
					postPaths.map(
						async postPath => {
							if (entriesMap.has(postPath)) { return []; }

							const entry = entryPaths.find(entry => postPath.startsWith(entry.basePath));

							if (!entry) {
								console.warn("No entry was found for post path - skipping meta creation");
								return [];
							}

							const newEntry = await PostFile.read(postPath, entry.id);

							return newEntry || [];
						}
					)
				)
			).flat();

			const filteredEntries = metadata.entries.filter(entry => postPaths.includes(entry.path));

			const modifiedEntries = [...entriesToCreate, ...filteredEntries];

			// const metadataResults = await Promise.all((entry.metadata || []).map(async metaEntry => {
			// 	try {
			// 		const value = await metaEntry.onUpdate(modifiedEntries);

			// 		const validatedEntries = value.map(
			// 			entry => metaEntry.validator ? metaEntry.validator(entry) : entry
			// 		);

			// 		return [metaEntry.id, validatedEntries];
			// 	} catch (error) {
			// 		console.error(error);
			// 		return [metaEntry.id, undefined];
			// 	}
			// }));

			MetaFile.readPostMeta({
				entry,
				// posts: modifiedEntries as any,
				config,
				// metadata: Object.fromEntries(metadataResults)
			})
		})
	);
}
