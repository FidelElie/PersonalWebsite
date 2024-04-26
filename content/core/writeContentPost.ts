import path from "path";
import fs from "fs/promises";

import { ensureDirExists } from "@/content/utilities";
import { DEFAULT_CONTENT_CONFIG } from "@/content/config";
import type { ContentConfig, PostSchema } from "@/content/types";

/**
 *
 * @param filename
 * @param content
 * @param config
 */
export const writeContentPost = async <Schema extends PostSchema = unknown>(
	context: {
		filename: string;
		content: string | string[];
		prefix?: string;
		config: ContentConfig<Schema>
	}
) => {
	const { config, content, filename, prefix } = context;

	const { posts } = config;

	const root = process.cwd();

	const parsedContent = typeof content === "string" ? content : content.join("\n");

	const writePath = path.join(
		root,
		posts?.postsDir || DEFAULT_CONTENT_CONFIG.posts.postsDir || "",
		prefix || "",
		filename
	);

	const baseWriteDir = path.dirname(writePath);

	ensureDirExists(baseWriteDir);

	await fs.writeFile(writePath, parsedContent);
}
