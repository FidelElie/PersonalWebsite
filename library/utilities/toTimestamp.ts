import { Timestamp } from "firebase/firestore"

export const toTimestamp = (jsonTimestamp: { seconds: number, nanoseconds: number }) => {
	return new Timestamp(jsonTimestamp.seconds, jsonTimestamp.nanoseconds);
}
