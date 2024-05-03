/** For times when you need to handle async and non async returns */
export type PromiseOrNot<T> = T | Promise<T>;

export type ArrayOrNot<T> = T | T[];

export type ObjectKeyValues<T extends GenericObject> = T[keyof T];

export type Flatten<T> = { [K in keyof T]: T[K] extends Array<infer E> ? E : T[K] };

export type GenericObject = { [key: string]: unknown };

export type RequiredObject<T extends GenericObject> = {
	[key in keyof T]-?: T[key] extends GenericObject ? RequiredObject<T[key]> : Required<T[key]>;
};

export type PaginatedResult<T> = {
	items: T[];
	offset: number;
	limit: number;
	previous: number | null;
	next: number | null;
	total: number;
}
