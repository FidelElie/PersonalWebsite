import { useMutation, useQuery } from "@tanstack/react-query";

import type { FindConfig } from "@/configs/firebase";

import { Detail, type DetailSchema } from "../models";

// READ Details
export type FindDetailConfig = FindConfig<DetailSchema>;

export const fetchDetails = (config?: FindDetailConfig) => Detail.find(config)

export const useFetchDetails = (config?: FindDetailConfig) => useQuery(
	["details", config],
	() => fetchDetails(config)
);

// CREATE Details
export const createDetails = (details: DetailSchema[]) => Detail.create(details);

export const useCreateDetails = () => useMutation(createDetails);

// UPDATE Detail
export const editDetail = (detail: DetailSchema & { id: string }) => {
	return Detail.findByIdAndUpdate(detail.id, detail);
}

export const useEditDetail = () => useMutation(editDetail);

// DELETE Detail
export const deleteDetail = (id: string) => Detail.findByIdAndDelete(id);

export const useDeleteDetail = () => useMutation(deleteDetail);
