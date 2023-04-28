import { useMutation, useQuery } from "@tanstack/react-query";

import { Skill, SkillSchema } from "../models";

export const fetchSkills = () => Skill.find();

export const useFetchSkills = () => useQuery(["skills"], fetchSkills);

export const useCreateSkills = () => useMutation(
	async (entries: SkillSchema[]) => {
		return await Skill.create(entries);
	}
);

export const useEditSkill= () => useMutation(
	async (project: SkillSchema & { id: string }) => {
		return await Skill.findByIdAndUpdate(project.id, project);
	}
);

export const useDeleteSkill = () => useMutation(
	async (id: string) => {
		return await Skill.findByIdAndDelete(id);
	}
)
