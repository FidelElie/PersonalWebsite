import { z } from "zod";

import { registerModel } from "@/configs/firebase";

const UserSchema = z.object({
	forename: z.string().optional(),
	surname: z.string().optional(),
	email: z.string().email(),
	uuid: z.string(),
	photo: z.string(),
	role: z.enum(["admin", "editor", "member"])
});

export const User = registerModel("users", UserSchema);

export type UserSchema = z.infer<typeof User.schema>;
export type UserModel = z.infer<typeof User.model>
