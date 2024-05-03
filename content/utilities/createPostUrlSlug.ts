import { sanitizeToURLSlug } from "@/libraries/utilities";
import { input } from "@inquirer/prompts";

export const createPostUrlSlug = async (name: string) => {
	const sanitizedUrl = sanitizeToURLSlug(name);

	if (!!sanitizedUrl) { return sanitizedUrl; }

	console.log(`Couldn't create a valid slug from ${name}`);

	const chosenSlug = await input({ message: `Manual slug` });

	return chosenSlug;
};
