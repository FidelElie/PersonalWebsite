import { useMutation, useQuery } from "@tanstack/react-query";

import type { FindConfig } from "@/configs/firebase";

import { Project, ProjectSchema } from "../models";

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
export const editProject = (project: ProjectSchema & { id: string }) => {
	return Project.findByIdAndUpdate(project.id, project);
}

export const useEditProject = () => useMutation(editProject);

// DELETE Project
export const deleteProject = (id: string) => Project.findByIdAndDelete(id);

export const useDeleteProject = () => useMutation(deleteProject);
