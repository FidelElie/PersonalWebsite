import { MergedModelSchema } from "@/configs/firebase";

import { ExperienceSchema } from "@/library/models";

import { Box, Copy, Divider, Flex, For, Heading, Icon, Link, Show } from "@/components/core";

import { useResumeBuilder } from "../../Resume.provider";

export const SidebarExperiences = () => {
	const { selected, queries } = useResumeBuilder();

	return (
		<Flex.Column className="space-y-3">
			<For each={queries.experiences}>
				{experience => <ExperienceEntry key={experience.id} experience={experience} />}
			</For>
		</Flex.Column>
	)
}

const ExperienceEntry = (props: ProjectEntryProps) => {
	const { experience } = props;

	const { queries: { tags } } = useResumeBuilder();

	const correspondingTags = tags.filter(tag => experience.tags.includes(tag.id));

	return (
		<Flex.Column key={experience.id} className="space-y-1.5">
			<Box>
				<Heading.Three className="text-xl mb-1" underline>{experience.title}</Heading.Three>
				<Heading.Four className="mb-0.5">{experience.organisation}</Heading.Four>
				<Show if={experience.link}>
					<Flex.Row className="items-center overflow-hidden">
						<Icon name="link" className="text-lg mr-2 flex-shrink-0 dark:text-white" />
						<Link href={experience.link!} className="text-sm text-ellipsis whitespace-nowrap">
							{experience.link}
						</Link>
					</Flex.Row>
				</Show>
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
	experience: MergedModelSchema<ExperienceSchema>
}
