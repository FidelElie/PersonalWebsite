import { MergedModelSchema } from "@/configs/firebase";
import { SkillSchema, TagSchema } from "@/library/models";

import { Card, Flex, Heading, Icon } from "@/components/core";
import { TagsDisplay } from "@/components/interfaces";

export const SkillCard = (props: SkillCardProps) => {
	const { skill, tags, onEdit, onDelete } = props;

	return (
		<Card className="group p-3">
			<Flex
				className="flex-col-reverse mb-2 md:items-center md:mb-0 md:justify-between md:flex-row"
			>
				<Flex.Row className="items-center">
					<Icon name={skill.icon} className="mr-2 text-2xl"/>
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
				</Flex.Row>
			</Flex>
			<TagsDisplay tagIds={skill.tags} tags={tags} className="mt-2" />
		</Card>
	)
}

type MergedSkillSchema = MergedModelSchema<SkillSchema>;

export interface SkillCardProps {
	skill: MergedSkillSchema;
	tags: MergedModelSchema<TagSchema>[];
	onEdit: (skill: MergedSkillSchema) => void;
	onDelete: (skill: MergedSkillSchema) => void;
}
