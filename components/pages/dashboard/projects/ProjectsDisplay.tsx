import { useQueryClient } from "@tanstack/react-query";


import type { ProjectModel, TagModel } from "@/library/models";
import { useEditProjectById } from "@/library/api";
import { clc } from "@/library/utilities";

import {
	Flex,
	For,
	Copy,
	Card,
	Divider,
	Heading,
	Icon,
	Link,
	Show,
	Toggle
} from "@/components/core";
import { TagsDisplay } from "@/components/interfaces";
import { InformationDisplay } from "../InformationDisplay";

export const ProjectsDisplay = (props: ProjectsDisplayProps) => {
	const { projects, tags, update, delete: _delete } = props;

	return (
		<Flex className="flex-col space-y-4">
			<For
				each={projects}
				else={<Copy>No projects created</Copy>}
			>
				{
					project => (
						<ProjectCard
							key={project.id}
							project={project}
							tags={tags}
							update={update}
							delete={_delete}
						/>
					)
				}
			</For>
		</Flex>
	)
}

const ProjectCard = (props: ProjectCardProps) => {
	const { project, tags, update, delete: _delete } = props;

	const queryClient = useQueryClient();
	const editProject = useEditProjectById();1

	const handleActiveToggle = async (checked: boolean) => {
		await editProject.mutateAsync({ id: project.id, project: { active: checked } });
		queryClient.invalidateQueries(["projects"]);
	}

	return (
		<Card className={clc("group p-3 transition-all", !project.active && "opacity-50")}>
			<Flex
				className="flex-col-reverse mb-2 md:items-center md:mb-0 md:justify-between md:flex-row"
			>
				<Heading.Three className="text-xl mb-1" underline>{project.title}</Heading.Three>
				<Flex.Row className="items-center space-x-2">
					<button
						className="opacity-100 md:opacity-0 group-hover:opacity-100"
						onClick={() => update(project.id)}
					>
						<Icon name="edit-line" className="text-lg dark:text-white" />
					</button>
					<button
						className="opacity-100 md:opacity-0 group-hover:opacity-100"
						onClick={() => _delete(project.id)}
					>
						<Icon name="delete-bin-line" className="text-lg dark:text-white" />
					</button>
					<Toggle
						label="Active"
						className="h-6 w-10"
						checked={project.active}
						onChange={handleActiveToggle}
					/>
				</Flex.Row>
			</Flex>
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
			<Show if={project.tags.length} else={<Copy className="text-xs my-2">No Tags added</Copy>}>
				<TagsDisplay tagIds={project.tags} tags={tags} className="mt-2" />
			</Show>
			<Divider className="my-2" />
			<InformationDisplay points={project.points} description={project.description} />
		</Card>
	)
}

type SharedProps = {
	tags: TagModel[];
	update: (id: string) => void;
	delete: (id: string) => void;
}

export interface ProjectCardProps extends SharedProps { project: ProjectModel; }

export interface ProjectsDisplayProps extends SharedProps { projects: ProjectModel[]; }
