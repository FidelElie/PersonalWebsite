import path from "path";
import fs from "fs/promises";

import chokidar from "chokidar";

import { DEFAULT_CONTENT_CONFIG } from "@/content/defaults";
import type { ContentConfig } from "@/content/types";
import { contentLogger } from "@/content/utilities";
import { MetaFile, MetaPostEntry } from "@/content/core";

import type { RequiredObject } from "@/libraries/types";
import { mergeObjects } from "@/libraries/utilities";

export const watchCMSContent = async (contentConfig: ContentConfig) => {
	const config = mergeObjects(DEFAULT_CONTENT_CONFIG, contentConfig);

	const {
		debug,
		entries,
		posts: { postsDir },
	} = config;

	if (!entries.length) { throw new Error("No entries are registered"); }

	// await resolveCurrentMetadata(contentConfig);

	const watcher = chokidar.watch(
		postsDir,
		{ persistent: true, ignored: ["**/*.json"],  }
	);

	watcher.on("ready", () => {
		contentLogger.info("Content dev server is ready");

		watcher.on("add", async (filePath) => {
			contentLogger.info(`New content entry at ${filePath}`);

			handleWatchEvent({ action: "add", config, filePath });
		});

		watcher.on("change", (filePath) => {
			contentLogger.info(`Modified content entry at ${filePath}`);

			handleWatchEvent({ action: "change", config, filePath });
		});

		watcher.on("unlink", (filePath) => {
			contentLogger.info(`Removing content entry at ${filePath}`);

			handleWatchEvent({ action: "unlink", config, filePath });
		});
	});
}

const handleWatchEvent = async (
	context: {
		action: "add" | "unlink" | "change";
		config: RequiredObject<ContentConfig>;
		filePath: string;
	}
) => {
	const { action, config, filePath } = context;

	const { entries, posts } = config;

	if (config.debug) { contentLogger.debug(`Mutating with action ${action} for path ${filePath}`); }

	const entryPaths = entries.map(
		entry => ({ ...entry, basePath: path.join(posts.postsDir, entry.id) })
	);

	const entry = entryPaths.find(entry => filePath.startsWith(entry.basePath));

	if (!entry) { return contentLogger.warn(`Corresponding entry not found at path ${filePath}`); }

	const { meta: metaFileContents } = await MetaFile.readPostMeta({ config, entry });

	const info = await (async () => {
		switch (action) {
			case "add":
				const newContentEntry = await MetaPostEntry.new({ filePath: filePath, post: entry.id });

				const entriesWithNew = Array.from(
					new Map(
						metaFileContents.entries.concat([newContentEntry]).map(entry => [entry.path, entry])
					).values()
				);

				return { entries: entriesWithNew, entry: newContentEntry };
			case "change":
				const existingEntry = metaFileContents.entries.find(entry => entry.path === filePath);

				if (!existingEntry) {
					return { entries: undefined, entry: undefined, error: "No existing entry found" };
				}

				const updatedEntry = await MetaPostEntry.update(existingEntry);

				if (!updatedEntry) {
					return { entries: undefined, entry: undefined, error: "Error updating entry" };
				}

				const updatedEntries = Array.from(
					new Map(
						metaFileContents.entries.concat([updatedEntry]).map(entry => [entry.path, entry])
					).values()
				);

				return { entries: updatedEntries, entry: updatedEntry };
			case "unlink":
				const filteredEntries = metaFileContents.entries.filter(entry => entry.path !== filePath);

				return { entries: filteredEntries };
			default:
				throw new Error(`Unknown action found - got ${action}`);
		}
	})();

	if (!info.entries) {
		return contentLogger.warn(`Error performing ${action} on path ${filePath} - ${info.error}`);
	}

	const metadataUpdates = await (async () => {
		// Don't run metadata syncing on post content update
		if (action === "change" || !entry.onSync) {
			return { internal: metaFileContents.metadata, external: [] };
		}

		const syncedData = await entry.onSync({ entry, posts: info.entries });

		const metadataEntriesToEdit = (entry.metadata || []).map(data => {
			const syncedMetadata = (syncedData.metadata || {})[data.id] || [];

			return { ...data, entries: syncedMetadata }
		})

		const internalMetadata = metadataEntriesToEdit.filter(entry => !entry.external);

		const externalMetadata = metadataEntriesToEdit.filter(entry => entry.external);

		const editedMetadata = Object.fromEntries(
			(internalMetadata || []).map(meta => {
				const editedMetadata = (() => {
					if (!meta.accessor) { return meta.entries; }

					return Array.from(
						new Map(
							meta.entries.map(
								// FIXME
								entry => [meta.accessor!(entry), entry]
							)
						).values()
					)
				})();

				return [meta.id, editedMetadata] as const;
			})
		);

		return { internal: editedMetadata, external: externalMetadata }
	})();

	await Promise.all(
		metadataUpdates.external.map(async metadata => {
			const externalMetadataFilePath = MetaFile.getExternalFilePath({ config, entry, metadata });

			const editedExternalMetadata = (() => {
				if (!metadata.accessor) { return metadata.entries; }

				return Array.from(
					new Map(
						metadata.entries.map(
							// FIXME
							entry => [metadata.accessor!(entry), entry]
						)
					).values()
				)
			})();

			const editedFileContents = { entries: editedExternalMetadata };

			await fs.writeFile(externalMetadataFilePath, JSON.stringify(editedFileContents, null, 2));
		})
	);

	await MetaFile.writePostMeta({
		config,
		entry,
		posts: info.entries,
		metadata: metadataUpdates.internal
	});
}
