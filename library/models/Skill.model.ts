import { z } from "zod";

import { registerModel } from "@/configs/firebase";

import { IconNames } from "@/components/core";

export const SkillSchema = z.object({
	name: z.string(),
	icon: z.enum(IconNames),
	tags: z.array(z.string()).default([]),
	active: z.boolean().default(false)
});

export type SkillSchema = z.infer<typeof SkillSchema>;

export const Skill = registerModel("skills", SkillSchema);
