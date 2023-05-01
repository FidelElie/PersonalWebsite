import { MergedModelSchema } from "@/configs/firebase";

import { ProjectSchema, TagSchema } from "@/library/models";

import { Box, Copy, Flex, For, Heading, Show } from "@/components/core";

import { useResumeBuilder } from "../../Resume.provider";

export const ProjectsBlock = () => {
	const { selected: { projects }, queries: { tags }, setView } = useResumeBuilder();

	return (
		<Box
			className="items-center flex-wrap space-y-1.5 cursor-pointer ring-1 ring-transparent ring-offset-8 hover:ring-primary"
			onClick={() => setView("projects")}
		>
			<Heading.Two className="text-primary uppercase">Notable Projects</Heading.Two>
			<Flex.Column className="space-y-2">
				<For each={projects}>
					{project => <Project key={project.id} project={project} tags={tags} />}
				</For>
			</Flex.Column>
		</Box>
	)
}

const Project = (props: ProjectProps) => {
	const { project, tags } = props;

	const correspondingTags = tags.filter(tag => project.tags.includes(tag.id));

	return (
		<Flex.Column>
			<Flex.Row className="items-center justify-between">
				<Heading.Three className="text-black">{project.title}</Heading.Three>
				<Show if={project.link}>
					{ link => <a className="text-primary text-xs underline" href={link}>{link}</a> }
				</Show>
			</Flex.Row>
			<Copy className="text-xs text-secondary mb-2">
				{correspondingTags.map(tag => tag.name).join(", ")}
			</Copy>
			<Copy className="text-xs">
				{project.description}
			</Copy>
		</Flex.Column>
	)
}

interface ProjectProps {
	project: MergedModelSchema<ProjectSchema>,
	tags: MergedModelSchema<TagSchema>[]
}

