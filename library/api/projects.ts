import { useMutation, useQuery } from "@tanstack/react-query";

import { MergedModelSchema } from "@/configs/firebase";

import { Project, ProjectSchema } from "../models";

export const fetchProjects = () => Project.find();

export const useFetchProjects = (
	config?: { onSuccess?: (data: MergedModelSchema<ProjectSchema>[]) => void }
) => useQuery(["projects"], fetchProjects, config);

export const useCreateProjects = () => useMutation(
	async (entries: ProjectSchema[]) => {
		return	await Project.create(entries);
	}
);

export const useEditProject = () => useMutation(
	async (project: ProjectSchema & { id: string }) => {
		return await Project.findByIdAndUpdate(project.id, project);
	}
);

export const useDeleteProject = () => useMutation(
	async (id: string) => {
		return await Project.findByIdAndDelete(id);
	}
)
