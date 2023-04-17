import type { DetailSchema } from "./models";

export type DetailsType = DetailSchema["data"]["type"];

export const detailTypes: DetailsType[] = [
	"education",
	"contact",
	"language",
	"activity",
	"interest"
];
