import { z } from "zod";

import { registerModel, reference } from "@/configs/firebase";

import { Tag } from "./Tag.model";

import { IconNames } from "@/components/core";

const SkillSchema = z.object({
	name: z.string(),
	icon: z.enum(IconNames),
	tags: z.array(reference(Tag.reference)).default([]),
	active: z.boolean().default(false)
});

export const Skill = registerModel("skills", SkillSchema);

export type SkillSchema = z.infer<typeof Skill["schema"]>;
export type SkillModel = z.infer<typeof Skill["model"]>;
