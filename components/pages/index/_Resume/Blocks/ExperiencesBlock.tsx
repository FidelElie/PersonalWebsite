import { toTimestamp } from "@/library/utilities";
import { ExperienceModel, TagModel } from "@/library/models";

import { Box, Copy, Flex, For, Heading, Show } from "@/components/core";

import { useResumeBuilder } from "../../ResumeProvider";

export const ExperiencesBlock = () => {
	const { selected: { experiences }, queries: { tags }, setView } = useResumeBuilder();

	experiences.sort(
		(a, b) => toTimestamp(b.startDate).toDate().valueOf() - toTimestamp(a.startDate).toDate().valueOf()
	);

	return (
		<Box className="space-y-1.5 cursor-pointer" onClick={() => setView("experiences")}>
			<Heading.Two className="text-primary uppercase">Relevant Work Experience</Heading.Two>
			<Flex.Column className="space-y-2">
				<For each={experiences}>
					{	experience => (
							<ExperiencePoint
								key={experience.id}
								experience={experience}
								tags={tags}
							/>
						)
					}
				</For>
			</Flex.Column>
		</Box>
	)
}

const ExperiencePoint = (props: ProjectProps) => {
	const { experience, tags } = props;

	const correspondingTags = tags.filter(tag => experience.tags.includes(tag.id));

	return (
		<Flex.Column>
			<Flex.Row className="items-center justify-between">
				<Heading.Three className="text-black">{experience.title}</Heading.Three>
				<Flex.Row className="items-center text-xs text-secondary">
					<Copy.Inline className="text-black tracking-wide">
						{toTimestamp(experience.startDate).toDate().getFullYear()}
					</Copy.Inline>
					<Copy.Inline>&nbsp;-&nbsp;</Copy.Inline>
					<Copy.Inline className="text-black tracking-wide">
						<Show if={experience.endDate} else="Present">
							{ endDate => toTimestamp(endDate).toDate().getFullYear() }
						</Show>
					</Copy.Inline>
				</Flex.Row>
			</Flex.Row>
			<Heading.Four className="font-light text-primary">
				{experience.organisation}
			</Heading.Four>
			<Copy className="text-xs text-secondary mb-2 line-clamp-2">
				{correspondingTags.map(tag => tag.name).join(", ")}
			</Copy>
			<Copy className="text-xs text-black">
				{experience.description}
			</Copy>
		</Flex.Column>
	)
}

interface ProjectProps {
	experience: ExperienceModel;
	tags: TagModel[];
}

