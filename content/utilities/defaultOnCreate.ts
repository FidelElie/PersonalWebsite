import { input } from "@inquirer/prompts";

import type { PostContext } from "@/content/types";
import { writeContentPost } from "@/content/core";
import { sanitizeToURLSlug } from "@/libraries/utilities";

export const defaultOnCreate = async (context: PostContext) => {
	const { config, entry } = context;

	const postSlug = await input({ message: "Enter new post slug " });

	const cleanedSlug = sanitizeToURLSlug(postSlug);

	await writeContentPost({
		filename: `${cleanedSlug}.${config.markdown?.type || "mdx"}`,
		prefix: entry.path || entry.id,
		content: [],
		config
	});
}
