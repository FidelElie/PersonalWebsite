import { z } from "zod";
import { Timestamp } from "firebase/firestore";

export const firebaseTimestampIdentifier = "firebase-timestamp:";

const FirebaseTimestampSchema = z.object({ seconds: z.number(), nanoseconds: z.number() });

export const toJSONTimestamp = (value: z.infer<typeof FirebaseTimestampSchema> | Date) => {
	if (value instanceof Date) {  return Timestamp.fromDate(value).toJSON(); }

	return value;
}

export const timestamp = () => {
	return z.union([
		FirebaseTimestampSchema,
		z.coerce.date()
	])
	.transform(toJSONTimestamp)
	.describe(`${firebaseTimestampIdentifier}timestamp`);
}
