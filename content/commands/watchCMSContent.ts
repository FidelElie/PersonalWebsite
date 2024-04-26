import path from "path";
import fs from "fs/promises";

import matter from "gray-matter";
import chokidar from "chokidar";
import picocolors from "picocolors";

import { mergeObjects } from "@/libraries/utilities";
import { RequiredObject } from "@/libraries/types";

import { writePostMetadata } from "@/content/core";
import { DEFAULT_CONTENT_CONFIG } from "@/content/config";
import type { ContentConfig, MetaPostEntry, PostEntryFields } from "@/content/types";
import { getFileName, getFilePathsFromDirectory } from "@/content/utilities";

const logPrefix = "CMS";

const logger = {
	info: (message: string) => console.info(`[${picocolors.blue(logPrefix)}] ${message}`),
	warn: (message: string) => console.warn(`[${picocolors.yellow(logPrefix)}] ${message}`),
	debug: (message: string) => console.debug(`[${picocolors.gray(logPrefix)}] ${message}`),
	error: (message: string) => console.error(`[${picocolors.red(logPrefix)}] ${message}`)
}

export const watchCMSContent = async (contentConfig: ContentConfig) => {
	const config = mergeObjects(DEFAULT_CONTENT_CONFIG, contentConfig);

	const {
		debug,
		entries,
		posts: {
			postsDir,
			emitMetadata,
			metadataDir,
			metadataFormat
		},
	} = config;

	if (!entries.length) { throw new Error("No entries are registered"); }

	if (emitMetadata) {
		const outputPaths = await Promise.all(
			entries.map(async entry => {
				const directoryPath = path.join(postsDir, entry.id);

				const outputPath = path.join(
					metadataDir || directoryPath,
					`${entry.id}.meta.${metadataFormat}`
				);

				const meta = await getFilePathsFromDirectory({
					path: directoryPath,
					recursive: true,
					transform: async (path) => await createContentEntry(path) || []
				});

				return { path: outputPath, entry, meta: meta.flat() };
			})
		);

		if (debug) {
			logger.debug("Creating meta output for following paths:");
			for (const outputPath of outputPaths) { logger.debug(outputPath.path); }
		}

		await Promise.all(
			outputPaths.map(outputPath => writePostMetadata({
				entry: outputPath.entry,
				entries: outputPath.meta,
				config
			}))
		);
	}

	const watcher = chokidar.watch(
		postsDir,
		{ persistent: true, ignored: ["**/*.meta.*"] }
	);

	watcher.on("ready", () => {
		logger.info("Content dev server is ready");

		watcher.on("add", async (filePath) => {
			logger.info(`New content entry at ${filePath}`);

			mutatePost({ action: "add", config, filePath });
		});

		watcher.on("change", (filePath) => {
			logger.info(`Modified content entry at ${filePath}`);

			mutatePost({ action: "change", config, filePath });
		});

		watcher.on("unlink", (filePath) => {
			logger.info(`Removing content entry at ${filePath}`);

			mutatePost({ action: "unlink", config, filePath });
		});
	});

}

/**
 *
 * @param context
 * @returns
 */
const mutatePost = async (
	context: {
		action: "add" | "unlink" | "change";
		config: RequiredObject<ContentConfig>;
		filePath: string;
	}
) => {
	const { action, config, filePath } = context;

	const { entries, posts } = config;

	if (config.debug) { logger.debug(`Mutating with action ${action} for path ${filePath}`); }

	if (!config.posts.emitMetadata) {
		return logger.warn("emitMetadata is disabled - skipping process");
	}

	const entryPaths = entries.map(
		entry => ({ ...entry, basePath: path.join(posts.postsDir, entry.id) })
	);

	const entry = entryPaths.find(entry => filePath.startsWith(entry.basePath));

	if (!entry) { return logger.warn(`Corresponding entry not found at path ${filePath}`); }

	const directoryPath = path.join(
		entry.path || posts.postsDir || DEFAULT_CONTENT_CONFIG.posts.postsDir,
		entry.id
	);

	const metaFilePath = path.join(
		posts.metadataDir || directoryPath,
		`${path.basename(entry.id)}.meta.${posts.metadataFormat}`
	);

	const metadataContent = await (async () => {
		const metadata = JSON.parse((await fs.readFile(metaFilePath)).toString()) || {
			entries: []
		};

		if (!metadata.entries || !Array.isArray(metadata.entries)) {
			throw new Error(`Invalid entries found in metadata file ${metaFilePath}`);
		}

		const validatedEntries = metadata.entries.map(
			(input: MetaPostEntry) => {
				return entry.validator ? {
					...input,
					metadata: entry.validator(input.metadata)
				} : input;
			}
		);

		return { entries: validatedEntries };
	})();

	const modifiedEntries = await (async () => {
		switch (action) {
			case "add":
			case "change":
				const contentEntry = await createContentEntry(filePath);

				if (!contentEntry) { return logger.warn(`Content entry not found at path ${filePath}`); }

				const entryExists = metadataContent.entries.some(
					(filEntry: PostEntryFields) => filEntry.slug === contentEntry.slug
				);

				if (!entryExists) { return metadataContent.entries.concat([contentEntry]); }

				return metadataContent.entries.map(
					(fileEntry: PostEntryFields) => fileEntry.slug === contentEntry.slug ? contentEntry : contentEntry
				);
			case "unlink":
				return metadataContent.entries.filter((filEntry: any) => filEntry.slug === entry.id);
			default:
				throw new Error(`Undefined action when mutating post, got ${action}`);
		}
	})();

	if (modifiedEntries) { await writePostMetadata({ entry, entries: modifiedEntries, config }); }
}

/**
 *
 * @param filePath
 * @returns
 */
const createContentEntry = async (filePath: string) => {
	try {
		const source = await fs.readFile(path.resolve(filePath));

		const { data: metadata, content } = matter(source);

		const slug = getFileName(filePath);

		if (!Object.keys(metadata).length) {
			logger.warn(`No valid metadata was found at path ${filePath} - skipping`);
			return null;
		}

		return { path: filePath, slug, metadata, content };
	} catch (error) {
		console.warn(`Couldn't pass metadata for path ${filePath}`);
		console.error(error);
		return null;
	}
}

if (require.main === module) { watchCMSContent(DEFAULT_CONTENT_CONFIG); }
