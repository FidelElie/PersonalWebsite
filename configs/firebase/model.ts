import { AnyZodObject, z } from "zod";
import {
	getDoc,
	doc,
	collection,
	Timestamp,
	DocumentData,
	getDocs,
	writeBatch,
	deleteDoc,
	serverTimestamp,
	updateDoc,
	getFirestore
} from "firebase/firestore";

import { getFirebaseClient } from "./client";

export const ModelSchema = z.object({
	id: z.string(),
	createdAt: z.coerce.date().transform(date => date.toISOString()),
	updatedAt: z.coerce.date().transform(date => date.toISOString()).nullable().optional()
});

export type ModelSchema = z.infer<typeof ModelSchema>;

export class Model<Schema extends AnyZodObject>{
	name: string;
	schema: any;
	db = getFirestore(getFirebaseClient());

	constructor(name: string, schema: Schema) {
		this.name = name;
		this.schema = ModelSchema.merge(schema);
	}

	create = async (data: z.infer<Schema> | z.infer<Schema>[]) => {
		const entries = Array.isArray(data) ? data : [data];

		const batch = writeBatch(this.db);

		entries.forEach(entry => {
			batch.set(this.getDocumentReference(entry.id), {
				...this.cleanEntry(entry),
				createdAt: serverTimestamp()
			})
		});

		await batch.commit();
	}

	find = async () => {
		const collection = this.getCollectionReference();

		const snapshot = await getDocs(collection);

		const validatedDocuments = Array.from(
			snapshot.docs,
			(value) => this.modelIncomingData(value.id, value.data())
		);

		return validatedDocuments;
	}

	findById = async (id: string) => {
		const snapshot = await getDoc(this.getDocumentReference(id));

		if (snapshot.exists()) {
			return this.modelIncomingData(snapshot.id, snapshot.data());
		} else {
			return null;
		}
	}

	findByIdAndUpdate = async (id: string, data: Partial<z.infer<Schema>>) => {
		await updateDoc(this.getDocumentReference(id), {
			...this.cleanEntry(data),
			updatedAt: serverTimestamp()
		})
	}

	findByIdAndDelete = async (id: string) => { await deleteDoc(this.getDocumentReference(id)); }

	// Utility methods
	private modelIncomingData = (id: string, data: DocumentData) => {
		const moddedData = Object.fromEntries(Object.entries(data).map(([key, value]) => {
			if (!value) { return [key, value]; }

			if (typeof value === "object" && value.seconds && value.nanoseconds) {
				return [key, new Timestamp(value.seconds, value.nanoseconds).toDate()]
			}

			return [key, value]
		}));

		return this.schema.parse({ ...moddedData, id }) as z.infer<Schema>;
	}

	private cleanEntry = (data: any) => {
		if (data.id) { delete data.id; }

		return data;
	}

	private getCollectionReference = () => { return collection(this.db, this.name); }

	private getDocumentReference = (id?: string) => {
		return id ? doc(this.db, this.name, id) : doc(this.db, this.name);
	}
}

export const registerModel = <Schema extends AnyZodObject>(name: string, schema: Schema) => {
	return new Model<Schema>(name, schema);
}
