import { z } from "zod";

import { registerModel, timestamp } from "@/configs/firebase";

import { TagSchema } from "./Tag.model";

export const ExperienceSchema = z.object({
	title: z.string(),
	position: z.string(),
	description: z.string(),
	link: z.string().optional(),
	startDate: timestamp(),
	endDate: timestamp().nullable().optional(),
	tags: z.array(z.union([z.string(), TagSchema]))
});

export type ExperienceSchema = z.infer<typeof ExperienceSchema>;

export const Experience = registerModel("experiences", ExperienceSchema);
