import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

import { ensureDirExists } from "@/content/utilities";
import { DEFAULT_CONTENT_CONFIG } from "@/content/defaults";
import type {
	ContentConfig,
	ContentFile,
	ContentPost,
	ExternalContentFile,
	PostEntry,
	PostMetadataEntry
} from "@/content/types";
import { GenericObject } from "@/libraries/types";

export const MetaFile = {
	/**
	 *
	 * @param context
	 * @returns
	 */
	readPostMeta: async function (context: ReadPostMetaContext) {
		const { config, entry } = context;

		const postsPath = path.join(
			config.posts?.postsDir || DEFAULT_CONTENT_CONFIG.posts.postsDir,
			entry.id
		);

		const outputPath = path.join(
			config.posts?.metadataDir || postsPath,
			`${entry.id}.meta.json`
		);

		await ensureDirExists(path.dirname(outputPath));

		const meta: ContentFile<unknown> = await (
			async () => {
				if (!existsSync(outputPath)) { return { entries: [], metadata: {} }; }

				return JSON.parse((await fs.readFile(outputPath)).toString());
			}
		)();

		return { meta, path: outputPath };
	},
	/**
	 *
	 * @param context
	 */
	writePostMeta: async function (context: WritePostMetaContext) {
		const { entry, posts, config, metadata } = context;

		const directoryPath = path.join(
			config.posts?.postsDir || DEFAULT_CONTENT_CONFIG.posts.postsDir,
			entry.id
		);

		const outputPath = path.join(
			config.posts?.metadataDir || directoryPath,
			`${entry.id}.meta.json`
		);

		const validatedEntries = posts.map(
			input => {
				return entry.validator ? {
					...input,
					metadata: entry.validator(input.metadata)
				} : input;
			}
		);

		const value = { entries: validatedEntries, metadata };

		await ensureDirExists(path.dirname(outputPath));

		await fs.writeFile(outputPath, JSON.stringify(value, null, 2));
	},
	/**
	 *
	 * @param context
	 * @returns
	 */
	getExternalFilePath: function (context: ReadExternalMetaContext) {
		const { config, entry, metadata } = context;

		const { posts } = config;

		if (!metadata.external) {
			throw new Error(`Metadata ${metadata.id} for entry ${entry.id} was not marked as external`);
		}

		const directoryPath = path.join(
			posts?.postsDir || DEFAULT_CONTENT_CONFIG.posts.postsDir,
			entry.id
		);

		const externalFilePath = path.join(
			posts?.metadataDir || directoryPath,
			typeof metadata.external === "string" ? metadata.external : `${metadata.id}.external.json`
		);

		return externalFilePath;
	},
	/**
	 *
	 * @param context
	 * @returns
	 */
	readExternal: async function (context: ReadExternalMetaContext) {
		const externalFilePath = this.getExternalFilePath(context);

		await ensureDirExists(path.dirname(externalFilePath));

		const externalFileContents: ExternalContentFile<unknown> = await (
			async () => {
				if (!existsSync(externalFilePath)) { return { entries: [] } }

				return JSON.parse((await fs.readFile(externalFilePath)).toString());
			}
		)();

		return { meta: externalFileContents, path: externalFilePath };
	},
}

type ReadPostMetaContext = {
	config: ContentConfig;
	entry: PostEntry<unknown>;
}

type WritePostMetaContext = {
	entry: PostEntry<unknown>;
	posts: ContentPost<unknown>[];
	metadata?: GenericObject;
	config: ContentConfig;
}

type ReadExternalMetaContext = {
	config: ContentConfig;
	entry: PostEntry<unknown>;
	metadata: PostMetadataEntry<unknown>;
}
