import { z } from "zod";

import { registerModel } from "@/configs/firebase";

const TagSchema = z.object({
	name: z.string(),
	link: z.string().nullable().optional()
});

export const Tag = registerModel("tags", TagSchema);

export type TagSchema = z.infer<typeof Tag.schema>;
export type TagModel = z.infer<typeof Tag.model>
