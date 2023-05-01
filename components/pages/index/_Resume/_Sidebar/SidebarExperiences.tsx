import { useMemo } from "react";

import type { MergedModelSchema } from "@/configs/firebase";

import { ExperienceSchema } from "@/library/models";

import {
	Box,
	Copy,
	Divider,
	Flex,
	For,
	Heading,
	Icon,
	Link,
	Show,
	Toggle
} from "@/components/core";

import { useResumeBuilder } from "../../Resume.provider";

export const SidebarExperiences = () => {
	const { queries, selected } = useResumeBuilder();

	const selectedExperiences = useMemo(
		() => selected.experiences.map(experience => experience.id),
		[selected.experiences]
	);

	return (
		<Flex.Column className="space-y-3 pr-1">
			<For each={queries.experiences}>
				{experience => (
					<ExperienceEntry
						key={experience.id}
						experience={experience}
						selected={selectedExperiences}
					/>
				)}
			</For>
		</Flex.Column>
	)
}

const ExperienceEntry = (props: ProjectEntryProps) => {
	const { experience, selected } = props;

	const { queries: { tags }, toggleSelected } = useResumeBuilder();

	const correspondingTags = tags.filter(tag => experience.tags.includes(tag.id));

	const isSelected = selected.includes(experience.id);

	return (
		<Flex.Column key={experience.id} className="space-y-1.5">
			<Box className="-space-y-0.5">
				<Flex.Row className="items-center justify-between">
					<Heading.Three className="text-lg mb-1" underline>{experience.title}</Heading.Three>
					<Toggle
						className="w-12"
						label={`Toggle ${experience.title}`}
						checked={isSelected}
						onChange={() => toggleSelected(experience.id, "experiences")}
					/>
				</Flex.Row>
				<Heading.Four className="mb-0.5">{experience.organisation}</Heading.Four>
				<Show if={experience.link}>
					<Flex.Row className="items-center overflow-hidden">
						<Icon name="link" className="text-lg mr-2 flex-shrink-0 dark:text-white" />
						<Link href={experience.link!} className="text-sm text-ellipsis whitespace-nowrap">
							{experience.link}
						</Link>
					</Flex.Row>
				</Show>
				<Flex.Row className="items-center text-sm">
					<Icon name="calendar-line" className="text-lg mr-2 dark:text-white" />
					<Copy.Inline>
						{experience.startDate.toLocaleDateString()}
					</Copy.Inline>
					<Copy.Inline>&nbsp;-&nbsp;</Copy.Inline>
					<Copy.Inline>
						{experience.endDate?.toLocaleDateString() ?? "Present"}
					</Copy.Inline>
				</Flex.Row>
			</Box>
			<Copy className="text-xs text-secondary">
				{correspondingTags.map(tag => tag.name).join(", ")}
			</Copy>
			<Divider className="my-2" />
			<Copy className="text-sm">{experience.description}</Copy>
		</Flex.Column>
	)
}

interface ProjectEntryProps {
	experience: MergedModelSchema<ExperienceSchema>,
	selected: string[]
}
