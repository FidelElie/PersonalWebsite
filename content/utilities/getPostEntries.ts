import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

import { DEFAULT_CONTENT_CONFIG } from "@/content/config";
import { ContentConfig, ContentPost } from "@/content/types";
import { ensureDirExists } from "@/content/utilities/ensureDirExists";

export const getPostEntries = async (
	context: { config: ContentConfig, filterIds?: string[] }
) => {
	const { config, filterIds } = context;

	const { posts } = config;

	const entries: ContentPost<unknown>[] = await Promise.all(
		config.entries.map(async entry => {
			if (filterIds && !filterIds.includes(entry.id)) { return []; }

			const directoryPath = path.join(
				posts?.postsDir || DEFAULT_CONTENT_CONFIG.posts.postsDir,
				entry.id
			);

			const metaFilePath = path.join(
				posts?.metadataDir || directoryPath,
				`${path.basename(entry.id)}.meta.json`
			);

			await ensureDirExists(path.dirname(metaFilePath));

			const contents = await (async () => {
				if (!existsSync(metaFilePath)) { return { entries: [], metadata: {} }; }

				return JSON.parse((await fs.readFile(metaFilePath)).toString());
			})();

			return contents.entries.map((metaEntry: ContentPost<unknown>) => ({ ...metaEntry, post: entry.id }));
		})
	);

	return entries.flat();
}
