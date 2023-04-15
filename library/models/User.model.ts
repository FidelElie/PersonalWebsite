import { z } from "zod";

import { Model } from "./model";

export const User = Model.merge(z.object({
	forename: z.string().optional(),
	surname: z.string().optional(),
	email: z.string().email(),
	uuid: z.string(),
	photo: z.string(),
	role: z.enum(["admin", "editor", "member"])
}))

export type User = z.infer<typeof User>;
