import { MergedModelSchema } from "@/configs/firebase";

import { SkillSchema, TagSchema } from "@/library/models";
import { clc } from "@/library/utilities";

import { Box, Copy, Flex, For, Grid, Heading, Icon } from "@/components/core";

import { useResumeBuilder } from "../../Resume.provider";

export const SkillsBlock = ({ className }: { className?: string }) => {
	const { selected: { skills }, queries: { tags }, setView } = useResumeBuilder();

	return (
		<Box
			className={clc("space-y-1.5 cursor-pointer", className)}
			onClick={() => setView("skills")}
		>
			<Heading.Two className="text-primary uppercase">Skills and Expertise</Heading.Two>
			<Grid className="grid-cols-3 gap-1">
				<For each={skills}>
					{skill => <Skill key={skill.id} skill={skill} tags={tags} />}
				</For>
			</Grid>
		</Box>
	)
}

const Skill = (props: SkillProps) => {
	const { skill, tags } = props;

	const correspondingTags = tags.filter(tag => skill.tags.includes(tag.id));

	return (
		<Flex.Row>
			<Icon name={skill.icon} className="text-xl mr-1 flex-shrink-0"/>
			<Flex.Column>
				<Heading.Three className="text-black">{skill.name}</Heading.Three>
				<Copy className="line-clamp-2 text-xs text-secondary">
					{correspondingTags.map(tag => tag.name).join(", ")}
				</Copy>
			</Flex.Column>
		</Flex.Row>
	)
}

interface SkillProps {
	skill: MergedModelSchema<SkillSchema>,
	tags: MergedModelSchema<TagSchema>[]
}
