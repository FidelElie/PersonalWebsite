import "dotenv/config";

import { Command } from "commander";
import { select } from "@inquirer/prompts";

import type { ContentConfig } from "@/content/types";
import { getContentConfig, defaultOnCreate } from "@/content/utilities";
import {  buildCMSContent, watchCMSContent } from "@/content/commands";

function createDevCommand(config: ContentConfig) {
	const devCommand = new Command("dev");

	devCommand
		.description("Start content dev server")
		.action(async () => { await watchCMSContent(config); });

	return devCommand;
}

function createBuildCommand(config: ContentConfig) {
	const buildCommand = new Command("build");

	buildCommand
		.description("Build CMS content")
		.action(async () => { await buildCMSContent(config); });

	return buildCommand;
}

function createPostsCommand(config: ContentConfig) {
	const { entries, posts } = config;

	const postsCommand = new Command("posts");

	postsCommand
		.command("new")
		.description("Create a new post -  registered in config")
		.option("--type <value>", "Type of post to create")
		.action(async (options) => {
			const fetchCorrespondingEntry = (id: string) => {
				const entry = entries.find(entry => entry.id === id);

				if (!entry) { throw new Error(`Couldn't find entry with corresponding id ${id}`); }

				return entry;
			}

			const { type } = options;

			if (entries.length === 1) {
				const onlyEntry = entries[0];

				return (onlyEntry.onCreate || defaultOnCreate)({ config, entry: onlyEntry });
			}

			if (type) {
				const entry = fetchCorrespondingEntry(type);

				return (entry.onCreate || defaultOnCreate)({ config, entry });
			}

			const option = await select({
				message: "What type of post would you like to create?",
				choices: entries.map(post => ({ value: post.id, name: post.name || post.id }))
			});

			const entry = fetchCorrespondingEntry(option);

			return (entry.onCreate || defaultOnCreate)({ config, entry });
		});

	return postsCommand;
}

async function main() {
	const program = new Command();

	const contentConfig = await getContentConfig();

	program.addCommand(createDevCommand(contentConfig));

	program.addCommand(createBuildCommand(contentConfig));

	program.addCommand(createPostsCommand(contentConfig));

	await program.parseAsync(process.argv);
}

if (require.main === module) { main(); }
