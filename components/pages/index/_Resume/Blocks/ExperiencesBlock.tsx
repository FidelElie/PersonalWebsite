import { MergedModelSchema } from "@/configs/firebase";

import { ExperienceSchema, TagSchema } from "@/library/models";

import { Box, Copy, Flex, For, Heading } from "@/components/core";

import { useResumeBuilder } from "../../Resume.provider";

export const ExperiencesBlock = () => {
	const { selected: { experiences }, queries: { tags }, setView } = useResumeBuilder();

	experiences.sort(
		(a, b) => new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf()
	);

	return (
		<Box
			className="space-y-1.5 cursor-pointer ring-1 ring-transparent ring-offset-8 hover:ring-primary"
			onClick={() => setView("experiences")}
		>
			<Heading.Two className="text-primary uppercase">Relevant Work Experience</Heading.Two>
			<Flex.Column className="space-y-2">
				<For each={experiences}>
					{experience => <Experience key={experience.id} experience={experience} tags={tags} />}
				</For>
			</Flex.Column>
		</Box>
	)
}

const Experience = (props: ProjectProps) => {
	const { experience, tags } = props;

	const correspondingTags = tags.filter(tag => experience.tags.includes(tag.id));

	return (
		<Flex.Column>
			<Flex.Row className="items-center justify-between">
				<Heading.Three className="text-black">{experience.title}</Heading.Three>
				<Flex.Row className="items-center text-xs text-secondary">
					<Copy.Inline className="text-black tracking-wide">
						{new Date(experience.startDate).getFullYear()}
					</Copy.Inline>
					<Copy.Inline>&nbsp;-&nbsp;</Copy.Inline>
					<Copy.Inline className="text-black tracking-wide">
						{experience.endDate ? new Date(experience.endDate).getFullYear() : "Present"}
					</Copy.Inline>
				</Flex.Row>
			</Flex.Row>
			<Copy className="text-xs text-secondary mb-2">
				{correspondingTags.map(tag => tag.name).join(", ")}
			</Copy>
			<Copy className="text-xs text-black">
				{experience.description}
			</Copy>
		</Flex.Column>
	)
}

interface ProjectProps {
	experience: MergedModelSchema<ExperienceSchema>,
	tags: MergedModelSchema<TagSchema>[]
}

