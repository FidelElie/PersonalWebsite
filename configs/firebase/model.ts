import { AnyZodObject, z } from "zod";
import {
	getDoc,
	doc,
	collection,
	DocumentData,
	getDocs,
	deleteDoc,
	serverTimestamp,
	updateDoc,
	getFirestore,
	setDoc,
	query,
	orderBy,
	limit,
	where,
	type CollectionReference,
	getCountFromServer,
} from "firebase/firestore";

import { getFirebaseClient } from "./client";
import { timestamp } from "./timestamp";

export const ModelSchema = z.object({
	id: z.string(),
	createdAt: timestamp(),
	updatedAt: timestamp().nullable().optional(),
	deletedAt: timestamp().nullable().optional()
});

export type ModelSchema = z.infer<typeof ModelSchema>;

export type MergedModelSchema<Schema> = ModelSchema & Schema;

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

		const collectionReference = this.getCollectionReference();

		await Promise.all(entries.map(entry => setDoc(doc(collectionReference), {
			...this.cleanEntry(entry),
			createdAt: serverTimestamp()
		})));
	}

	find = async (config: FindConfig<z.infer<Schema>> = {}) => {
		const collection = this.createQueryObject(this.getCollectionReference(), config);

		const snapshot = await getDocs(collection);

		const validatedDocuments = Array.from(
			snapshot.docs,
			(value) => this.modelIncomingData(value.id, value.data())
		);

		return validatedDocuments;
	}

	findOne = async (config: FindConfig<z.infer<Schema>> = {}) => {
		const collection = this.createQueryObject(this.getCollectionReference(), config);

		const snapshot = await getDocs(collection);

		if (snapshot.docs.length === 0) {
			return null;
		} else {
			const firstResult = snapshot.docs[0];
			return this.modelIncomingData(firstResult.id, firstResult.data())
		}
	}

	findById = async (id: string) => {
		const snapshot = await getDoc(this.getDocumentReference(id));

		if (snapshot.exists()) {
			return this.modelIncomingData(
				snapshot.id,
				snapshot.data()
			) as MergedModelSchema<z.infer<Schema>>;
		} else {
			return null;
		}
	}

	findByIdAndUpdate = async (id: string, data: Partial<MergedModelSchema<z.infer<Schema>>>) => {
		await updateDoc(this.getDocumentReference(id), {
			...this.cleanEntry(data),
			updatedAt: serverTimestamp()
		});
	}

	findByIdAndDelete = async (id: string) => { await deleteDoc(this.getDocumentReference(id)); }

	updateMany = async (
		config: FindConfig<z.infer<Schema>> = {},
		data: Partial<MergedModelSchema<z.infer<Schema>>>
	) => {
		const documents = await this.find(config);

		await Promise.all(documents.map(document => updateDoc(
			this.getDocumentReference(document.id), {
				...this.cleanEntry(data),
				updatedAt: serverTimestamp()
			}
		)));
	}

	deleteMany = async (config: FindConfig<z.infer<Schema>> = {}) => {
		const documents = await this.find(config);

		await Promise.all(documents.map(document => deleteDoc(this.getDocumentReference(document.id))));
	}

	countDocuments = async (config: FindConfig<z.infer<Schema>> = {}) => {
		const collection = this.createQueryObject(this.getCollectionReference(), config);

		const snapshot = await getCountFromServer(collection);

		return snapshot.data().count;
	}

	// Utility methods
	private modelIncomingData = (id: string, data: DocumentData) => {
		const moddedData = Object.fromEntries(Object.entries(data).map(([key, value]) => {
			if (!value) { return [key, value]; }

			return [key, value]
		}));

		return this.schema.parse({ ...moddedData, id }) as MergedModelSchema<z.infer<Schema>>
	}

	private cleanEntry = (data: any) => {
		if (data.id) { delete data.id; }

		return data;
	}

	private getCollectionReference = () => { return collection(this.db, this.name); }

	private getDocumentReference = (id?: string) => {
		return id ? doc(this.db, this.name, id) : doc(this.db, this.name);
	}

	private createQueryObject = (
		collection: CollectionReference<DocumentData>,
		config: FindConfig<z.infer<Schema>> = {}
	) => {
		const { where: _where, order, limit: _limit } = config;

		if (_where || order || _limit) {
			const configs = [
				_where ? this.parseWhereConfig(_where): [],
				order ? this.parseOrderConfig(order)  : [],
				_limit ? limit(_limit) : []
			].flat()

			return query(collection, ...configs);
		} else {
			return collection;
		}
	}

	parseWhereConfig = (_where: NonNullable<FindConfig<z.infer<Schema>>["where"]>) => {
		return _where.map(array => {
			const [key, operation, value] = array;

			return where(key.toString(), operation, value);
		})
	}

	parseOrderConfig = (order: NonNullable<FindConfig<z.infer<Schema>>["order"]>) => {
		const ordersToParse = typeof order === "string" ?
			order.split(" ").map(order => [order.trim()]) :
			Object.entries(order);

		return ordersToParse.map((order) => {
			const [key, direction] = order;

			if (!direction || (direction !== "asc" && direction !== "desc")) { return orderBy(key); }

			return orderBy(key, direction);
		});
	}
}

export const registerModel = <Schema extends AnyZodObject>(name: string, schema: Schema) => {
	return new Model<Schema>(name, schema);
}

type WhereOperations = "==" | "!=" | "<" | ">" | ">=" | "<=" | "array-contains" | "array-contains-any";
type ArrayOperations =  | "in" | "not-in";

export interface FindConfig<Schema> {
	where?: (
		readonly [keyof Schema, WhereOperations, Schema[keyof Schema]] |
		readonly [keyof Schema, ArrayOperations, (Schema[keyof Schema])[]]
	)[];
	order?: string | { [key in keyof Partial<Schema>]: "asc" | "desc" };
	limit?: number;
}
