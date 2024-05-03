import fs from "fs/promises";

import { Separator, checkbox, confirm, input, select } from "@inquirer/prompts";

import type { ContentConfig, ContentPost } from "@/content/types";
import { contentLogger, getPostEntries } from "@/content/utilities";
import { MetaFile, resolveCurrentMetadata } from "@/content/core";

export const publishCMSContent = async (
	context: { config: ContentConfig; filter?: string; unpublish?: boolean }
) => {
	const { config, filter, unpublish } = context;

	contentLogger.info(`Updating metadata files${filter ? `for id ${filter}`: ""}`);

	await resolveCurrentMetadata(config, filter ? [filter] : undefined);

	const unpublishPosts = await (async () => {
		if (unpublish !== undefined) { return unpublish; }

		return confirm({
			message: "Would you like to unpublish posts instead?",
			default: false
		});
	})();

	const action = unpublishPosts ? "unpublish" : "publish";

	const chosenPostFilter = await (async () => {
		if (filter) { return filter; }

		if (config.entries.length === 1) { return config.entries[0].id; }

		return select({
			message: `Choose what lists to ${action} from`,
			choices: [
				...config.entries.map(entry => ({ name: entry.name, value: entry.id })),
				new Separator(),
				{
					value: null,
					name: "All posts"
				},
			],
			default: null
		})
	})();

	const ids = chosenPostFilter ? [chosenPostFilter] : config.entries.map(entry => entry.id);

	const postEntries = await Promise.all(
		ids.map(async id => {
			const posts = await getPostEntries({ config, filterIds: [id] });

			return [id, posts] as const;
		})
	);

	const postsMap = new Map(postEntries);

	const flattenedPosts = postEntries.map(entry => entry[1]).flat();

	const filterEntries = flattenedPosts.filter(
		entry => unpublishPosts ? entry.publishedAt : !entry.publishedAt
	);

	if (!filterEntries.length) {
		contentLogger.info(`No posts were found to ${action}`);
		return;
	}

	const choices = await checkbox({
		message: `Choose what posts you would like to ${action}`,
		choices: filterEntries.map(
			entry => ({ value: entry.path, name: `[${entry.post}] ${entry.slug} (${entry.path})` })
		)
	});

	if (!choices.length) {
		contentLogger.info(`No posts were selected to ${action}`);
		return;
	}

	const entriesToAction = filterEntries.filter(entry => choices.includes(entry.path));

	const actionedEntries = await handleEntryPublishing(entriesToAction, unpublishPosts);

	for (const [id, entries] of postEntries) {
		const entriesToModify = actionedEntries.filter(entry => entry.post === id);

		postsMap.set(
			id,
			entries.map(entry => entriesToModify.find(mod => mod.slug === entry.slug) || entry)
		);
	}

	// Write the posts back to their files
	await Promise.all(
		config.entries.map(async entry => {
			const { meta: output, path: outputPath } = await MetaFile.readPostMeta({ config, entry });

			const correspondingEntries = postsMap.get(entry.id);

			if (!correspondingEntries) { return; }

			await fs.writeFile(
				outputPath,
				JSON.stringify(
					{
						entries: correspondingEntries,
						metadata: output.metadata.metadata
					},
					null,
					2
				)
			)
		})
	);

	for (const entry of entriesToAction) {
		contentLogger.info(`[${entry.post}] ${entry.slug} was ${action}ed successfully`);
	}
}

const handleEntryPublishing = async (
	entriesToAction: ContentPost<unknown>[] = [],
	unpublish = false
) => {
	if (unpublish) { return entriesToAction.map(entry => ({ ...entry, publishedAt: null })); }

	if (entriesToAction.length > 1) {
		const pickSameDate = await confirm({
			message: "Pick the same date for all posts?",
			default: true
		});

		if (pickSameDate) {
			const chosenDate = await pickPublishDateForPost();

			return entriesToAction.map(entry => ({ ...entry, publishedAt: chosenDate }));
		}

		const editedEntries: typeof entriesToAction = [];

		for (let entryIndex = 0; entryIndex < entriesToAction.length; entryIndex += 1) {
			const entry = entriesToAction[entryIndex];

			const chosenDate = await pickPublishDateForPost(
				`${entryIndex} of ${entriesToAction.length}: [${entry.post}] ${entry.slug} (${entry.path}) Publish date`
			);

			editedEntries.push({ ...entry, publishedAt: chosenDate });

			return editedEntries;
		}
	}

	const [singularPost] = entriesToAction;

	const singularDate = await pickPublishDateForPost();

	return [{ ...singularPost, publishedAt: singularDate }];
}

const pickPublishDateForPost = async (message?: string) => {
	const customDateOrNow = await select({
		message: message || "How do you want to choose your date?",
		choices: [
			{ value: "custom-date", name: "Input date" },
			{ value: "today", name: `Today (${new Date().toLocaleString()})`}
		],
		default: "today"
	});

	if (customDateOrNow === "today") { return new Date().toISOString(); }

	const currentDate = await input({
		message: "What date would you like to use to publish",
		validate: (value) => { return !isNaN(new Date(value).getTime()); },
	});

	return new Date(currentDate).toISOString();
}
