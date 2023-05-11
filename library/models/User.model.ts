import { z } from "zod";

import { registerModel } from "@/configs/firebase";

export const UserSchema = z.object({
	forename: z.string().optional(),
	surname: z.string().optional(),
	email: z.string().email(),
	uuid: z.string(),
	photo: z.string(),
	role: z.enum(["admin", "editor", "member"])
});

export type UserSchema = z.infer<typeof UserSchema>;

export const User = registerModel("users", UserSchema);
