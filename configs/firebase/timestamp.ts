import { z } from "zod";
import { Timestamp } from "firebase/firestore";

export const timestampToDate = (value: { seconds: number, nanoseconds: number }) => {
	return new Timestamp(value.seconds, value.nanoseconds).toDate().toISOString()
}

export const timestamp = () => {
	return z.object({ seconds: z.number(), nanoseconds: z.number() }).transform(timestampToDate)
}
