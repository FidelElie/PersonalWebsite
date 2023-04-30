import { useMutation, useQuery } from "@tanstack/react-query";

import { MergedModelSchema } from "@/configs/firebase";

import { Experience, ExperienceSchema } from "../models";

export const fetchExperiences = () => Experience.find();

export const useFetchExperiences = (
	config?: { onSuccess?: (data: MergedModelSchema<ExperienceSchema>[]) => void }
) => useQuery(["experiences"], fetchExperiences, config);

export const useCreateExperiences = () => useMutation(
	async (entries: ExperienceSchema[]) => {
		return await Experience.create(entries);
	}
);

export const useEditExperience = () => useMutation(
	async (project: ExperienceSchema & { id: string }) => {
		return await Experience.findByIdAndUpdate(project.id, project);
	}
);

export const useDeleteExperience = () => useMutation(
	async (id: string) => {
		return await Experience.findByIdAndDelete(id);
	}
)
