import { z } from "zod";

import { Model } from "./model";

export const SkillInfo = Model.merge(z.object({
	type: z.enum(["skill"]),
	icon: z.string(),
	items: z.array(z.object({ text: z.string(), order: z.string() }))
}));
