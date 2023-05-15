import { useMutation, useQuery } from "@tanstack/react-query";

import type { FindConfig } from "@/configs/firebase";

import { Experience, type ExperienceSchema } from "../models";

// READ Experiences
export type FindExperienceConfig = Omit<FindConfig<ExperienceSchema>, "order">;

export const fetchExperiences = (config: FindExperienceConfig = {}) => Experience.find({
	...config,
	order: { startDate: "desc" }
});

export const useFetchExperiences = (config?: FindExperienceConfig) => useQuery(
	["experiences", config],
	() => fetchExperiences(config)
);

// CREATE Experiences
const createExperiences = (entries: ExperienceSchema[]) => Experience.create(entries);

export const useCreateExperiences = () => useMutation(createExperiences);

// UPDATE Experience
export const editExperience = (project: ExperienceSchema & { id: string }) => {
	return Experience.findByIdAndUpdate(project.id, project);
}

export const useEditExperience = () => useMutation(editExperience);

// DELETE Experience
export const deleteExperience = (id: string) => Experience.findByIdAndDelete(id);

export const useDeleteExperience = () => useMutation(deleteExperience);
