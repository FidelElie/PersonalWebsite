import { z } from "zod";

import { registerModel, timestamp } from "@/configs/firebase";

export const ExperienceSchema = z.object({
	title: z.string(),
	organisation: z.string(),
	description: z.string(),
	link: z.string().optional(),
	startDate: timestamp(),
	endDate: timestamp().nullable().optional()
});

export type ExperienceSchema = z.infer<typeof ExperienceSchema>;

export const Experience = registerModel("experiences", ExperienceSchema);
