import { useQueryClient } from "@tanstack/react-query";

import { useEditSkillById  } from "@/library/api";
import { SkillModel, TagModel } from "@/library/models";
import { clc } from "@/library/utilities";

import { Grid, For, Copy, Card, Flex, Heading, Icon, Toggle } from "@/components/core";
import { TagsDisplay } from "@/components/interfaces";

export const SkillsDisplay = (props: SkillDisplayProps) => {
	const { skills, tags, update, delete: _delete } = props;

	return (
		<Grid className="gap-3 grid-cols-1 md:grid-cols-2">
				<For each={skills} else={<Copy>No skills created</Copy>}>
					{
						skill => (
							<SkillCard
								key={skill.id}
								skill={skill}
								tags={tags}
								update={update}
								delete={_delete}
							/>
						)
					}
				</For>
			</Grid>
	)
}

export const SkillCard = (props: SkillCardProps) => {
	const { skill, tags, update, delete: _delete } = props;

	const queryClient = useQueryClient();
	const editSkill = useEditSkillById();

	const handleActiveToggle = async (checked: boolean) => {
		await editSkill.mutateAsync({ id: skill.id, skill: { active: checked } });
		queryClient.invalidateQueries(["skills"]);
	}

	return (
		<Card className={clc("group p-3 transition-all", !skill.active && "opacity-50")}>
			<Flex
				className="flex-row mb-2 md:items-center md:mb-0 justify-between md:flex-row"
			>
				<Flex.Row className="items-center">
					<Icon name={skill.icon} className="mr-2 text-2xl dark:text-white" />
					<Heading.Three className="text-xl mb-1" underline>{skill.name}</Heading.Three>
				</Flex.Row>
				<Flex.Row className="items-center space-x-2">
					<button
						className="opacity-100 md:opacity-0 group-hover:opacity-100"
						onClick={() => update(skill.id)}
					>
						<Icon name="edit-line" className="text-lg dark:text-white" />
					</button>
					<button
						className="opacity-100 md:opacity-0 group-hover:opacity-100"
						onClick={() => _delete(skill.id)}
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

type SharedProps = {
	tags: TagModel[],
	update: (id: string) => void;
	delete: (id: string) => void;
}

export interface SkillDisplayProps extends SharedProps { skills: SkillModel[]; }

export interface SkillCardProps extends SharedProps { skill: SkillModel; }
