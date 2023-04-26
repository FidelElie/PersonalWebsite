import { z } from "zod";

import { registerModel } from "@/configs/firebase";

export const ProjectSchema = z.object({
	title: z.string(),
	description: z.string(),
	link: z.string().optional(),
	repo: z.string().optional()
});

export type ProjectSchema = z.infer<typeof ProjectSchema>;

export const Project = registerModel("projects", ProjectSchema);
