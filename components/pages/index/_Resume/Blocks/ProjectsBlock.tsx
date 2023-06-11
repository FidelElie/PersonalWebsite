import type { ProjectModel, TagModel } from "@/library/models";

import { Box, Copy, Flex, For, Heading, Show } from "@/components/core";
import { PointsDisplay } from "@/components/interfaces";
import { useResumeBuilder } from "../../ResumeBuilderProvider";
import { PlaceholderBlock } from "./PlaceholderBlock";

export const ProjectsBlock = () => {
	const { selected: { projects }, queries: { tags }, setView, settings } = useResumeBuilder();

	return (
		<Box
			className="items-center flex-wrap space-y-1.5 cursor-pointer"
			onClick={() => setView("projects")}
		>
			<Heading.Two className="text-primary uppercase" light>Notable Projects</Heading.Two>
			<Flex.Column className="space-y-2">
				<For each={projects} else={<PlaceholderBlock title="projects"/>}>
					{project => (
							<ProjectPoint
								key={project.id}
								project={project}
								tags={tags}
								showDescription={settings.useDescriptions}
							/>
						)}
				</For>
			</Flex.Column>
		</Box>
	)
}

const ProjectPoint = (props: ProjectPointProps) => {
	const { project, tags, showDescription } = props;

	const correspondingTags = tags.filter(tag => project.tags.includes(tag.id));

	return (
		<Flex.Column>
			<Flex.Row className="items-center justify-between">
				<Heading.Three className="text-black" light>{project.title}</Heading.Three>
				<Show if={project.link}>
					{ link => <a className="text-primary text-xs underline" href={link}>{link}</a> }
				</Show>
			</Flex.Row>
			<Flex.Row className="flex-wrap gap-0.5 my-1 line-clamp-2">
				<For each={correspondingTags}>
					{ tag => (
						<Flex as="span" className="p-0.5 border rounded" key={tag.id}>
							<Copy className="text-xs" light>{tag.name}</Copy>
						</Flex>
					)}
				</For>
			</Flex.Row>
			<Show if={showDescription} else={<PointsDisplay points={project.points} />}>
				<Copy className="text-xs text-black" light>{project.description}</Copy>
			</Show>
		</Flex.Column>
	)
}

interface ProjectPointProps {
	project: ProjectModel
	tags: TagModel[];
	showDescription: boolean;
}

