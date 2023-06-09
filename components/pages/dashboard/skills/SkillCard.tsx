import { useQueryClient } from "@tanstack/react-query";

import { clc } from "@/library/utilities";
import { TagModel, SkillModel } from "@/library/models";
import { useEditSkillById } from "@/library/api";

import { Card, Flex, Heading, Icon, Toggle } from "@/components/core";
import { TagsDisplay } from "@/components/interfaces";

export const SkillCard = (props: SkillCardProps) => {
	const { skill, tags, onEdit, onDelete } = props;

	const queryClient = useQueryClient();
	const editSkill = useEditSkillById();

	const handleActiveToggle = async (checked: boolean ) => {
		await editSkill.mutateAsync({ id: skill.id, skill: { active: checked }});
		queryClient.invalidateQueries(["skills"]);
	}

	return (
		<Card className={clc("group p-3 transition-all", !skill.active && "opacity-50")}>
			<Flex
				className="flex-row mb-2 md:items-center md:mb-0 justify-between md:flex-row"
			>
				<Flex.Row className="items-center">
					<Icon name={skill.icon} className="mr-2 text-2xl dark:text-white"/>
					<Heading.Three className="text-xl mb-1" underline>{skill.name}</Heading.Three>
				</Flex.Row>
				<Flex.Row className="items-center space-x-2">
					<button
						className="opacity-100 md:opacity-0 group-hover:opacity-100"
						onClick={() => onEdit(skill)}
					>
						<Icon name="edit-line" className="text-lg dark:text-white" />
					</button>
					<button
						className="opacity-100 md:opacity-0 group-hover:opacity-100"
						onClick={() => onDelete(skill)}
					>
						<Icon name="delete-bin-line" className="text-lg dark:text-white" />
					</button>
					<Toggle
						label="Active"
						className="h-6 w-10"
						checked={skill.active}
						onChange={handleActiveToggle}
					/>
				</Flex.Row>
			</Flex>
			<TagsDisplay tagIds={skill.tags} tags={tags} className="mt-2" />
		</Card>
	)
}

export interface SkillCardProps {
	skill: SkillModel;
	tags: TagModel[];
	onEdit: (skill: SkillModel) => void;
	onDelete: (skill: SkillModel) => void;
}
