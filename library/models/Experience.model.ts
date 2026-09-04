import { z } from "zod";

import { reference, registerModel, timestamp } from "@/configs/firebase";

import { Tag } from "./Tag.model";

const ExperienceSchema = z.object({
	title: z.string(),
	organisation: z.string(),
	description: z.string(),
	link: z.string().optional(),
	startDate: timestamp(),
	endDate: timestamp().nullable().optional(),
	tags: z.array(reference(Tag.reference)).default([]),
	active: z.boolean().default(false),
	points: z.array(z.string()).default([])
});

export const Experience = registerModel("experiences", ExperienceSchema);

export type ExperienceSchema = z.infer<typeof Experience.schema>;
export type ExperienceModel = z.infer<typeof Experience.model>;
