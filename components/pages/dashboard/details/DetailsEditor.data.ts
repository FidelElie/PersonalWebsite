import { DetailSchema } from "@/library/models";

export type DetailsFormFieldsInterface = {
	fields: DetailSchema,
	editDataFields: (data: Partial<DetailSchema["data"]>) => void;
}
