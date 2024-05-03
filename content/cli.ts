import "dotenv/config";

import { Command } from "commander";

import type { ContentConfig } from "@/content/types";
import { getContentConfig } from "@/content/utilities";
import {
	buildCMSContent,
	createCMSContent,
	publishCMSContent,
	watchCMSContent
} from "@/content/commands";

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
	const { entries } = config;

	const postsCommand = new Command("posts");

	postsCommand
		.command("new")
		.description("Create a new post -  registered in config")
		.option("--type <value>", "Type of post to create")
		.action(async (options) => {
			if (options.type && !entries.some(entry => entry.id === options.type)) {
				throw new Error(
					`Invalid --type expected id to be one of: ${entries.map(entry => entry.id).join(",")}`
				);
			}

			await createCMSContent({ entries, config, ...options });
		});

	postsCommand
		.command("publish")
		.description("Publish new posts interactively or through optional parameters")
		.option("--filter <value>", "Filter to a certain type of posts")
		.option("--unpublish", "Unpublish or publish posts")
		.action(async (options) => {
			if (options.filter && !entries.some(entry => entry.id === options.filter)) {
				throw new Error(
					`Invalid --filter expected id to be one of: ${entries.map(entry => entry.id).join(",")}`
				);
			}

			if (options["--unpublish"] && typeof options["--unpublish"] !== "boolean") {
				throw new Error(
					`Invalid --unpublish flag expected boolean got ${typeof options["--unpublish"]}`
				);
			}

			await publishCMSContent({ config, ...options });
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
