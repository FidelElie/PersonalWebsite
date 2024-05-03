import path from "path";
import fs from "fs/promises";

import matter from "gray-matter";

import { ContentPost } from "@/content/types";
import { contentLogger } from "@/content/utilities";

import { PostFile } from "@/content/core/PostFile";

export const MetaPostEntry = {
	/**
	 *
	 * @param filePath
	 * @param post
	 * @returns
	 */
	new: async function (context: NewContentEntryContext) {
		const { entry, filePath, post } = context;

		const data = entry ? entry : await PostFile.read(filePath, post);

		if (!data) { throw Error("Parsing entry"); }

		const currentDate = (new Date()).toISOString();

		const dates = { createdAt: currentDate, updatedAt: currentDate, publishedAt: null };

		return { ...data, ...dates }
	},
	update: async function (contentEntry: ContentPost<unknown>) {
		try {
			const source = await fs.readFile(path.resolve(contentEntry.path));

			const { data: metadata, content } = matter(source);

			if (!Object.keys(metadata).length) {
				contentLogger.warn(`No valid metadata was found at path ${contentEntry.path} - skipping`);
				return null;
			}

			const updatedAt = (new Date()).toISOString();

			return { ...contentEntry, metadata, content, updatedAt };
		} catch (error) {
			console.warn(`Couldn't parse metadata from path ${contentEntry.path}`);
			console.error(error);
			return null;
		}
	}
}

type NewContentEntryContext = (
	{
		entry: Omit<ContentPost<unknown>, "createdAt" | "updatedAt" | "publishedAt">;
		filePath?: never;
		post?: never
	} |
	{
		entry?: never;
		filePath: string;
		post: string;
	}
);
