import { SkillModel, TagModel } from "@/library/models";
import { clc } from "@/library/utilities";

import { Box, Copy, Flex, For, Grid, Heading, Icon, Show } from "@/components/core";

import { useResumeBuilder } from "../../ResumeBuilderProvider";
import { PlaceholderBlock } from "./PlaceholderBlock";

export const SkillsBlock = ({ className }: { className?: string }) => {
	const { selected: { skills }, queries: { tags }, setView } = useResumeBuilder();

	return (
		<Box
			className={clc("space-y-1.5 cursor-pointer", className)}
			onClick={() => setView("skills")}
		>
			<Heading.Two className="text-primary uppercase" light>Skills and Expertise</Heading.Two>
			<Show if={skills.length} else={<PlaceholderBlock title="skills" />}>
				<Grid className="grid-cols-3 gap-1">
					<For each={skills}>
						{skill => <SkillPoint key={skill.id} skill={skill} tags={tags} />}
					</For>
				</Grid>
			</Show>
		</Box>
	)
}

const SkillPoint = (props: SkillProps) => {
	const { skill, tags } = props;

	const correspondingTags = tags.filter(tag => skill.tags.includes(tag.id));

	return (
		<Flex.Row>
			<Icon name={skill.icon} className="text-xl mr-1 flex-shrink-0 text-secondary"/>
			<Flex.Column>
				<Heading.Three className="text-secondary" light>{skill.name}</Heading.Three>
				<Copy className="line-clamp-2 text-xs text-gray-400" light>
					{correspondingTags.map(tag => tag.name).join(", ")}
				</Copy>
			</Flex.Column>
		</Flex.Row>
	)
}

interface SkillProps {
	skill: SkillModel;
	tags: TagModel[];
}
