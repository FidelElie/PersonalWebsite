import z from "zod";

export const UsersSchema = z.object({
	id: z.number().int(),
	user_id: z.string().uuid(),
	created_at: z.coerce.date().nullable(),
	updated_at: z.coerce.date().nullable(),
	email: z.string().email(),
	username: z.string().nullable(),
	forename: z.string().nullable(),
	surname: z.string().nullable(),
});

export const RolesSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	description: z.string(),
	created_at: z.coerce.date().nullable(),
	updated_at: z.coerce.date().nullable(),
});

export const UserRolesSchema = z.object({
	id: z.number().int(),
	user_id: z.number().int(),
	role_id: z.number().int(),
	created_at: z.coerce.date().nullable(),
});
