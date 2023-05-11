import { z } from "zod";

import { registerModel } from "@/configs/firebase";

export const TagSchema = z.object({
	name: z.string(),
	link: z.string().nullable().optional()
});

export type TagSchema = z.infer<typeof TagSchema>;

export const Tag = registerModel("tags", TagSchema);
