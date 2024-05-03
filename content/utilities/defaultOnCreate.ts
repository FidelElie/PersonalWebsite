import { input } from "@inquirer/prompts";

import { createPostUrlSlug } from "@/content/utilities";

export const defaultOnCreate = async () => {
	const postSlug = await input({ message: "Enter new post slug " });

	const cleanedSlug = await createPostUrlSlug(postSlug);

	return {
		slug: cleanedSlug,
		metadata: {},
		content: []
	}
}
