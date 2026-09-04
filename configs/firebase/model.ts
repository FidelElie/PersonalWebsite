import { AnyZodObject, ZodArray, ZodObject, ZodTypeAny, z } from "zod";
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
	getCountFromServer,
	type CollectionReference
} from "firebase/firestore";

import { getFirebaseClient } from "./client";
import { firebaseTimestampIdentifier, timestamp } from "./timestamp";
import { firebaseReferenceIdentifier } from "./reference";

export const ModelSchema = z.object({
	id: z.string(),
	createdAt: timestamp(),
	updatedAt: timestamp().nullable().optional(),
	deletedAt: timestamp().nullable().optional()
});

export class Model<Schema extends AnyZodObject>{
	name: string;
	schema: Schema;
	model: ReturnType<typeof ModelSchema.merge<Schema, Schema["shape"]>>
	db = getFirestore(getFirebaseClient());

	constructor(name: string, model: Schema) {
		this.name = name;
		this.schema = model;
		this.model = ModelSchema.merge(model) as ReturnType<
			typeof ModelSchema.merge<Schema, Schema["shape"]>
		>;
	}

	create = async (data: z.infer<Schema> | z.infer<Schema>[]) => {
		const entries = Array.isArray(data) ? data : [data];

		const collectionReference = this.getCollectionReference();

		await Promise.all(entries.map(entry => setDoc(doc(collectionReference), {
			...this.parseEntry(entry),
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
			) as z.infer<typeof this.model>;
		} else {
			return null;
		}
	}

	findByIdAndUpdate = async (id: string, data: Partial<z.infer<typeof this.model>>) => {
		await updateDoc(this.getDocumentReference(id), {
			...this.parseEntry(data),
			updatedAt: serverTimestamp()
		});
	}

	findByIdAndDelete = async (id: string) => { await deleteDoc(this.getDocumentReference(id)); }

	updateMany = async (
		config: FindConfig<z.infer<Schema>> = {},
		data: Partial<z.infer<typeof this.model>>
	) => {
		const documents = await this.find(config);

		await Promise.all(documents.map(document => updateDoc(
			this.getDocumentReference(document.id), {
				...this.parseEntry(data),
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

		return this.model.parse({ ...moddedData, id }) as z.infer<typeof this.model>;
	}

	private parseEntry = (data: any): any => {
		if (data.id) { delete data.id; }

		const parsedData = Object.fromEntries(Object.entries(data).map(([key, value]) => {
			if (!value) { return [key, value]; }

			const schemaEntry = this.model.shape[key];
			const hasReferenceDescriptor = this.findDescriptor(schemaEntry, firebaseReferenceIdentifier);
			const hasTimestampDescriptor = this.findDescriptor(schemaEntry, firebaseTimestampIdentifier);

			if (this.hasObjectType(schemaEntry)) { return [key, this.parseEntry(value)] }

			if (!hasReferenceDescriptor && !hasTimestampDescriptor) { return [key, value]; }

			const hasArrayType = this.hasArrayType(this.model.shape[key]);

			if (hasReferenceDescriptor) {
				const schemaReference = hasReferenceDescriptor.replace(firebaseReferenceIdentifier, "");

				if (hasArrayType) {
					return [
						key,
						z.array(z.string()).parse(value).map(id => this.getDocumentReference(id, schemaReference))
					];
				} else {
					return [key, this.getDocumentReference(z.string().parse(value), schemaReference)];
				}
			}

			if (hasTimestampDescriptor) {
				return [key, (hasArrayType ? z.array(timestamp()) : timestamp()).parse(value)];
			}

			return [key, value];
		}));

		return parsedData;
	}

	private getCollectionReference = () => { return collection(this.db, this.name); }

	private getDocumentReference = (id?: string, collection?: null | string) => {
		const collectionName = collection || this.name;

		return id ? doc(this.db, collectionName, id) : doc(this.db, collectionName);
	}

	hasArrayType = (type: ZodTypeAny): boolean => {
		if (type instanceof ZodArray) { return true; }

		if (type._def.innerType || type._def.type) {
			return this.hasArrayType(type._def.innerType || type._def.type);
		}

		return false;
	}

	hasObjectType = (type: ZodTypeAny): boolean => {
		if (type instanceof ZodObject) { return true; }

		return false;
	}

	findDescriptor = (type: ZodTypeAny, descriptor: string): string | null => {
		if (!type) { return null; }

		if (type._def.description?.includes(descriptor)) { return type._def.description; }

		if (type._def.innerType || type._def.type) {
			return this.findDescriptor(type._def.innerType || type._def.type, descriptor);
		}

		return null;
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
