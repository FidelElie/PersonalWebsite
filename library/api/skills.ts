import { useMutation, useQuery } from "@tanstack/react-query";

import type { FindConfig } from "@/configs/firebase";

import { Skill, SkillSchema, SkillModel } from "../models";

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
export const editSkillById = (
	{ id, skill }: { id: string, skill: Partial<SkillModel> }
) => {
	return Skill.findByIdAndUpdate(id, skill);
}

export const useEditSkillById = () => useMutation(editSkillById);

// DELETE Skill
export const deleteSkill = (id: string) => Skill.findByIdAndDelete(id);

export const useDeleteSkill = () => useMutation(deleteSkill);
