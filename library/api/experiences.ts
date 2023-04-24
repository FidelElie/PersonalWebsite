import { useMutation, useQuery } from "@tanstack/react-query";

import { MergedModelSchema } from "@/configs/firebase";

import { Experience, ExperienceSchema } from "../models";

export const useFetchExperiences = () => useQuery(
	["projects"],
	async () => {
		return await Experience.find();
	}
)

export const useCreateExperiences = () => useMutation(
	async (entries: ExperienceSchema[]) => {
		return await Experience.create(entries);
	}
);

export const useEditExperience = () => useMutation(
	async (project: MergedModelSchema<ExperienceSchema>) => {
		return await Experience.findByIdAndUpdate(project.id, project);
	}
);

export const useDeleteExperience = () => useMutation(
	async (id: string) => {
		return await Experience.findByIdAndDelete(id);
	}
)
