import { useMutation, useQuery } from "@tanstack/react-query";

import { MergedModelSchema } from "@/configs/firebase";

import { Skill, SkillSchema } from "../models";

export const fetchSkills = () => Skill.find();

export const useFetchSkills = (
	config?: { onSuccess?: (data: MergedModelSchema<SkillSchema>[]) => void }
) => useQuery(["skills"], fetchSkills, config);

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
