import { useMutation, useQuery } from "@tanstack/react-query";

import { Project, ProjectSchema } from "../models";

export const fetchProjects = () => Project.find();

export const useFetchProjects = () => useQuery(["projects"], fetchProjects);

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
