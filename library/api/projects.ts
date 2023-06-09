import { useMutation, useQuery } from "@tanstack/react-query";

import type { FindConfig } from "@/configs/firebase";

import { Project, ProjectModel, ProjectSchema } from "../models";

// READ Projects
export type FetchProjectConfig = FindConfig<ProjectSchema>;

export const fetchProjects = (config?: FetchProjectConfig) => Project.find(config);

export const useFetchProjects = (config?: FetchProjectConfig) => useQuery(
	["projects", config],
	() => fetchProjects(config)
);

// CREATE Projects
export const createProjects = (entries: ProjectSchema[]) => Project.create(entries);

export const useCreateProjects = () => useMutation(createProjects);

// UPDATE Project
export const editProjectById = (
	{ id, project }: { id: string, project: Partial<ProjectModel> }
) => {
	return Project.findByIdAndUpdate(id, project);
}

export const useEditProjectById = () => useMutation(editProjectById);

// DELETE Project
export const deleteProject = (id: string) => Project.findByIdAndDelete(id);

export const useDeleteProject = () => useMutation(deleteProject);
