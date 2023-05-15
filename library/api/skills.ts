import { useMutation, useQuery } from "@tanstack/react-query";

import type { FindConfig } from "@/configs/firebase";

import { Skill, type SkillSchema } from "../models";

// READ Skills
export type FindSkillConfig = FindConfig<SkillSchema>;

export const fetchSkills = (config?: FindSkillConfig) => Skill.find(config);

export const useFetchSkills = (config?: FindSkillConfig) => useQuery(
	["skills", config],
	() => fetchSkills(config)
);

// CREATE Skills
export const createSkills = (entries: SkillSchema[]) => Skill.create(entries);

export const useCreateSkills = () => useMutation(createSkills);

// UPDATE Skill
export const editSkill = (project: SkillSchema & { id: string }) => {
	return Skill.findByIdAndUpdate(project.id, project);
}

export const useEditSkill = () => useMutation(editSkill);

// DELETE Skill
export const deleteSkill = (id: string) => Skill.findByIdAndDelete(id);

export const useDeleteSkill = () => useMutation(deleteSkill);
