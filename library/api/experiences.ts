import { useMutation, useQuery } from "@tanstack/react-query";

import { Experience, ExperienceSchema } from "../models";

export const fetchExperiences = () => Experience.find();

export const useFetchExperiences = () => useQuery(["experiences"], fetchExperiences);

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
