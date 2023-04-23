import { z } from "zod";

import { registerModel } from "@/configs/firebase";

export const TagTypes = ["coding", "general"] as const;

export const TagSchema = z.object({
	name: z.string(),
	type: z.enum(TagTypes)
});

export type TagSchema = z.infer<typeof TagSchema>;

export const Tag = registerModel("tags", TagSchema);
