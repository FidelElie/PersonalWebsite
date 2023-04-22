import { useMutation, useQuery } from "@tanstack/react-query";

import { Detail, DetailSchema } from "../models";

export const useFetchDetails = () => useQuery({
	queryKey: ["details"],
	queryFn: async () => {
		return await Detail.find();
	}
});

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
