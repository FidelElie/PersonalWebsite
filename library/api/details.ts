import { useMutation, useQuery } from "@tanstack/react-query";

import { MergedModelSchema } from "@/configs/firebase";

import { Detail, DetailSchema } from "../models";

export const fetchDetails = () => Detail.find()

export const useFetchDetails = (
	config?: { onSuccess?: (data: MergedModelSchema<DetailSchema>[]) => void }
) => useQuery(["details"], fetchDetails, config);

export const useCreateDetails = () => useMutation(
	async (details: DetailSchema[]) => {
		await Detail.create(details);
	}
);

export const useEditDetail = () => useMutation(
	async (detail: DetailSchema & { id: string }) => {
		await Detail.findByIdAndUpdate(detail.id, detail);
	}
);

export const useDeleteDetail = () => useMutation(
	async (id: string) => {
		await Detail.findByIdAndDelete(id);
	}
)
