import z from "zod";

import { UsersSchema, UserRolesSchema, RolesSchema } from "../schemas";

export const FetchCurrentUserDTO = UsersSchema.merge(
	z.object({
		roles: z.array(UserRolesSchema.merge(z.object({ role: RolesSchema })))
	})
);

export type FetchCurrentUserDTOType = z.infer<typeof FetchCurrentUserDTO>;
