import { z } from "zod";

export const firebaseReferenceIdentifier = "firebase-reference:";

// Partial schema to match important parts
const FirebaseReferenceSchema = z.object(
	{
		converter: z.any().nullable(),
		type: z.literal("document"),
		firestore: z.any(),
		_key: z.object({
			path: z.object({
				len: z.number(),
				offset: z.number(),
				segments: z.array(z.string())
			})
		})
	}
);

export const toReferenceId = (value: z.infer<typeof FirebaseReferenceSchema> | string) => {
	if (typeof value === "string") { return value; }

	return z.string().parse(value._key.path.segments.at(-1));
}

export const reference = (schema: string) => {
	const referenceString = !schema.includes(firebaseReferenceIdentifier) ? `${firebaseReferenceIdentifier}${schema}` : schema;

	return z.union([
		FirebaseReferenceSchema,
		z.string()
	]).transform(toReferenceId).describe(referenceString);
}
