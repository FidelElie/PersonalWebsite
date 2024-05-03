import { AnyZodObject, ZodSchema, ZodUnion, z } from "zod";

// FIXME
export const ContentPostSchema = <T extends AnyZodObject | ZodUnion<[AnyZodObject]>>(value: T) => {
	return z.object(
		{
			slug: z.string(),
			path: z.string(),
			post: z.string(),
			createdAt: z.string(),
			updatedAt: z.string().nullish(),
			publishedAt: z.string().nullish(),
			content: z.string().optional(),
		}
	).merge(
		z.object({
			metadata: value
		})
	);
}

export const PaginatedResponse = <T extends ZodSchema>(schema: T) => {
	return z.object({
		items: z.array(schema),
		offset: z.number(),
		limit: z.number(),
		previous: z.number().nullable(),
		next: z.number().nullable(),
		total: z.number()
	});
}
