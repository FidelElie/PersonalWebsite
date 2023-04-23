import { useMutation, useQuery } from "@tanstack/react-query";

import { MergedModelSchema } from "@/configs/firebase";

import { Project, ProjectSchema } from "../models";

export const useFetchProjects = () => useQuery(
	["projects"],
	async () => {
		return await Project.find();
	}
)

export const useCreateProjects = () => useMutation(
	async (entries: ProjectSchema[]) => {
		return	await Project.create(entries);
	}
);

export const useEditProject = () => useMutation(
	async (project: MergedModelSchema<ProjectSchema>) => {
		return await Project.findByIdAndUpdate(project.id, project);
	}
);

export const useDeleteProject = () => useMutation(
	async (id: string) => {
		return await Project.findByIdAndDelete(id);
	}
)
