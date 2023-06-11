import { useMemo } from "react";

import { ProjectModel } from "@/library/models";

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

import { InformationDisplay } from "@/components/interfaces";

import { useResumeBuilder } from "../../ResumeBuilderProvider";

export const SidebarProjects = () => {
	const { selected, queries } = useResumeBuilder();

	const selectedProjects = useMemo(
		() => selected.projects.map(project => project.id),
		[selected.projects]
	);

	return (
		<Flex.Column className="space-y-3 pr-1">
			<For each={queries.projects}>
				{ project => (
					<ProjectEntry key={project.id} project={project} selected={selectedProjects} />
				) }
			</For>
		</Flex.Column>
	)
}

const ProjectEntry = (props: ProjectEntryProps) => {
	const { project, selected } = props;

	const { queries: { tags }, toggleSelected } = useResumeBuilder();

	const correspondingTags = tags.filter(tag => project.tags.includes(tag.id));

	const isSelected = selected.includes(project.id);

	return (
		<Flex.Column key={project.id} className="space-y-1.5">
			<Box>
				<Flex.Row className="items-center justify-between">
					<Heading.Three className="text-lg mb-1" underline>{project.title}</Heading.Three>
					<Toggle
						className="w-12"
						label={`Toggle ${project.title}`}
						checked={isSelected}
						onChange={() => toggleSelected(project.id, "projects")}
					/>
				</Flex.Row>
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
			<InformationDisplay points={project.points} description={project.description} light/>
		</Flex.Column>
	)
}

interface ProjectEntryProps {
	project: ProjectModel;
	selected: string[];
}
