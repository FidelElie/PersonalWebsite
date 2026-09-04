import { AnyZodObject } from "zod";

import { Model } from "./model";

import { firebaseReferenceIdentifier } from "./reference";

export const registerModel = <Schema extends AnyZodObject>(
	name: string,
	schema: Schema
): RegisteredModel<Schema> => {
	const model = new Model<Schema>(name, schema);

	const config = { reference: `${firebaseReferenceIdentifier}:${name}` }

	return Object.assign(model, config);
}

export type RegisteredModel<Schema extends AnyZodObject> = Model<Schema> & { reference: string; }
