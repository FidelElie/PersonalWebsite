import { MergedModelSchema } from "@/configs/firebase";

import { ProjectSchema } from "@/library/models";

import { Box, Copy, Divider, Flex, For, Heading, Icon, Link, Show } from "@/components/core";

import { useResumeBuilder } from "../../Resume.provider";

export const SidebarProjects = () => {
	const { selected, queries } = useResumeBuilder();

	return (
		<Flex.Column className="space-y-3">
			<For each={queries.projects}>
				{ project => <ProjectEntry key={project.id} project={project}/> }
			</For>
		</Flex.Column>
	)
}

const ProjectEntry = (props: ProjectEntryProps) => {
	const { project } = props;

	const { queries: { tags }} = useResumeBuilder();

	const correspondingTags = tags.filter(tag => project.tags.includes(tag.id));

	return (
		<Flex.Column key={project.id} className="space-y-1.5">
			<Box>
				<Heading.Three className="text-xl mb-1" underline>{project.title}</Heading.Three>
				<Show if={project.link}>
					<Flex.Row className="items-center overflow-hidden">
						<Icon name="link" className="text-lg mr-2 flex-shrink-0 dark:text-white" />
						<Link href={project.link!} className="text-sm text-ellipsis whitespace-nowrap">
							{project.link}
						</Link>
					</Flex.Row>
				</Show>
				<Show if={project.repo}>
					<Flex.Row className="items-center overflow-hidden text-ellipsis">
						<Icon name="github-fill" className="text-lg mr-2 flex-shrink-0 dark:text-white" />
						<Link href={project.repo!} className="text-sm text-ellipsis whitespace-nowrap">
							{project.repo}
						</Link>
					</Flex.Row>
				</Show>
			</Box>
			<Copy className="text-xs text-secondary">
				{correspondingTags.map(tag => tag.name).join(", ")}
			</Copy>
			<Divider className="my-2" />
			<Copy className="text-xs md:text-sm">{project.description}</Copy>
		</Flex.Column>
	)
}

interface ProjectEntryProps {
	project: MergedModelSchema<ProjectSchema>
}
