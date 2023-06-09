import { useMemo } from "react";

import { SkillModel } from "@/library/models";

import { Copy, Flex, For, Heading, Icon, Toggle } from "@/components/core";

import { useResumeBuilder } from "../../ResumeProvider";

export const SidebarSkills = () => {
	const { selected, queries } = useResumeBuilder();

	const selectedSkills = useMemo(
		() => selected.skills.map(skill => skill.id),
		[selected.skills]
	);

	return (
		<Flex.Column className="space-y-3 pr-1">
			<For each={queries.skills}>
				{skill => <SkillEntry key={skill.id} skill={skill} selected={selectedSkills}/>}
			</For>
		</Flex.Column>
	)
}

const SkillEntry = (props: ProjectEntryProps) => {
	const { skill, selected } = props;

	const { queries: { tags }, toggleSelected } = useResumeBuilder();

	const correspondingTags = tags.filter(tag => skill.tags.includes(tag.id));

	const isSelected = selected.includes(skill.id);

	return (
		<Flex.Column key={skill.id} className="space-y-1.5">
			<Flex.Row className="items-center justify-between">
				<Flex.Row className="items-center">
					<Icon name={skill.icon} className="text-lg mr-1.5"/>
					<Heading.Three className="text-xl mb-1" underline>{skill.name}</Heading.Three>
				</Flex.Row>
				<Toggle
					className="w-12"
					label={`Toggle ${skill.name}`}
					checked={isSelected}
					onChange={() => toggleSelected(skill.id, "skills")}
				/>
			</Flex.Row>
			<Copy className="text-xs text-secondary">
				{correspondingTags.map(tag => tag.name).join(", ")}
			</Copy>
		</Flex.Column>
	)
}

interface ProjectEntryProps {
	skill: SkillModel;
	selected: string[];
}

