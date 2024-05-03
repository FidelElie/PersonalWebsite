import { select } from "@inquirer/prompts";

import { PostFile } from "@/content/core";
import { defaultOnCreate } from "@/content/utilities";
import type { ContentConfig, PostEntry } from "@/content/types";

export const createCMSContent = async (
	context: { entries: PostEntry<any>[]; config: ContentConfig; type?: string; }
) => {
	const { entries, type } = context;

	const fetchCorrespondingEntry = (id: string) => {
		const entry = entries.find(entry => entry.id === id);

		if (!entry) { throw new Error(`Couldn't find entry with corresponding id ${id}`); }

		return entry;
	}

	const getEntry = async () => {
		if (entries.length === 1) { return entries[0]; }

		const entryFromType = type && fetchCorrespondingEntry(type);

		if (entryFromType) { return entryFromType; }

		const option = await select({
			message: "What type of post would you like to create?",
			choices: entries.map(post => ({ value: post.id, name: post.name || post.id }))
		});

		return fetchCorrespondingEntry(option);
	}

	const entry = await getEntry();

	const result = await (entry.onCreate || defaultOnCreate)({ entry });

	await Promise.all(
		(Array.isArray(result) ? result : [result]).map(
			async post => PostFile.new({
				slug: post.slug,
				metadata: post.metadata,
				content: [],
				entry
			})
		)
	);
}
