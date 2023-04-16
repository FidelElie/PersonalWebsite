import { z } from "zod";

import { registerModel } from "@/configs/firebase";

export const SkillSchema = z.object({
	type: z.enum(["skill"]),
	icon: z.string(),
	items: z.array(z.object({ text: z.string(), order: z.string() }))
});

export type SkillSchema = z.infer<typeof SkillSchema>;

export const Skill = registerModel("skills", SkillSchema);
