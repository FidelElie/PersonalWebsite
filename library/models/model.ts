import { z } from "zod";

export const Model = z.object({
	id: z.string(),
	createdAt: z.coerce.date().transform(date => date.toISOString()),
	updatedAt: z.coerce.date().transform(date => date.toISOString()).nullable().optional()
});

export type Model = z.infer<typeof Model>;
