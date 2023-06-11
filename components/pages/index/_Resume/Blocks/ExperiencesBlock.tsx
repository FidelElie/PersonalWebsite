import { toTimestamp } from "@/library/utilities";
import { ExperienceModel, TagModel } from "@/library/models";

import { Box, Copy, Flex, For, Heading, Show } from "@/components/core";
import { PointsDisplay } from "@/components/interfaces";
import { useResumeBuilder } from "../../ResumeBuilderProvider";
import { PlaceholderBlock } from "./PlaceholderBlock";

export const ExperiencesBlock = () => {
	const { selected: { experiences }, queries: { tags }, setView, settings } = useResumeBuilder();

	experiences.sort(
		(a, b) => toTimestamp(b.startDate).toDate().valueOf() - toTimestamp(a.startDate).toDate().valueOf()
	);

	return (
		<Box className="space-y-1.5 cursor-pointer" onClick={() => setView("experiences")}>
			<Heading.Two className="text-primary uppercase" light>Relevant Work Experience</Heading.Two>
			<Flex.Column className="space-y-2">
				<For each={experiences} else={<PlaceholderBlock title="experiences"/>}>
					{	experience => (
							<ExperiencePoint
								key={experience.id}
								experience={experience}
								tags={tags}
								showDescription={settings.useDescriptions}
							/>
						)
					}
				</For>
			</Flex.Column>
		</Box>
	)
}

const ExperiencePoint = (props: ExperiencePointProps) => {
	const { experience, tags, showDescription } = props;

	const correspondingTags = tags.filter(tag => experience.tags.includes(tag.id));

	return (
		<Flex.Column>
			<Flex.Row className="items-center justify-between">
				<Heading.Three className="text-black" light>{experience.title}</Heading.Three>
				<Flex.Row className="items-center text-xs text-secondary">
					<Copy.Inline className="text-black tracking-wide" light>
						{toTimestamp(experience.startDate).toDate().getFullYear()}
					</Copy.Inline>
					<Copy.Inline light>&nbsp;-&nbsp;</Copy.Inline>
					<Copy.Inline className="text-black tracking-wide" light>
						<Show if={experience.endDate} else="Present">
							{ endDate => toTimestamp(endDate).toDate().getFullYear() }
						</Show>
					</Copy.Inline>
				</Flex.Row>
			</Flex.Row>
			<Heading.Four className="font-light text-primary" light>
				{experience.organisation}
			</Heading.Four>
			<Flex.Row className="flex-wrap gap-0.5 my-1 line-clamp-2">
				<For each={correspondingTags}>
					{tag => (
						<Flex className="p-0.5 border rounded" key={tag.id}>
							<Copy className="text-xs" light>{tag.name}</Copy>
						</Flex>
					)}
				</For>
			</Flex.Row>
			<Show if={showDescription} else={<PointsDisplay points={experience.points} light/>}>
				<Copy className="text-xs text-black" light>{experience.description}</Copy>
			</Show>
		</Flex.Column>
	)
}

interface ExperiencePointProps {
	experience: ExperienceModel;
	tags: TagModel[];
	showDescription: boolean;
}

