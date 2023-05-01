import { MergedModelSchema } from "@/configs/firebase";

import { SkillSchema } from "@/library/models";

import { Box, Copy, Divider, Flex, For, Heading, Icon, Link, Show } from "@/components/core";

import { useResumeBuilder } from "../../Resume.provider";

export const SidebarSkills = () => {
	const { selected, queries } = useResumeBuilder();

	return (
		<Flex.Column className="space-y-3">
			<For each={queries.skills}>
				{skill => <SkillEntry key={skill.id} skill={skill} />}
			</For>
		</Flex.Column>
	)
}

const SkillEntry = (props: ProjectEntryProps) => {
	const { skill } = props;

	const { queries: { tags } } = useResumeBuilder();

	const correspondingTags = tags.filter(tag => skill.tags.includes(tag.id));

	return (
		<Flex.Column key={skill.id} className="space-y-1.5">
			<Flex.Row className="items-center">
				<Icon name={skill.icon} className="text-lg mr-1.5"/>
				<Heading.Three className="text-xl mb-1" underline>{skill.name}</Heading.Three>
			</Flex.Row>
			<Copy className="text-xs text-secondary">
				{correspondingTags.map(tag => tag.name).join(", ")}
			</Copy>
		</Flex.Column>
	)
}

interface ProjectEntryProps {
	skill: MergedModelSchema<SkillSchema>
}

