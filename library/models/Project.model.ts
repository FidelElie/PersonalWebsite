import { z } from "zod";

import { reference, registerModel } from "@/configs/firebase";

import { Tag } from "./Tag.model";

const ProjectSchema = z.object({
	title: z.string(),
	description: z.string(),
	link: z.string().optional(),
	repo: z.string().optional(),
	tags: z.array(reference(Tag.reference)).default([]),
	active: z.boolean().default(false),
	points: z.array(z.string()).default([])
});

export const Project = registerModel("projects", ProjectSchema);

export type ProjectSchema = z.infer<typeof Project.schema>;
export type ProjectModel = z.infer<typeof Project.model>;
