import { useQueryClient } from "@tanstack/react-query";

import { clc } from "@/library/utilities";
import { useEditProjectById } from "@/library/api";
import { ProjectModel, TagModel } from "@/library/models";

import { Card, Copy, Divider, Flex, Heading, Icon, Link, Show, Toggle } from "@/components/core";
import { TagsDisplay } from "@/components/interfaces";

export const ProjectCard = (props: ProjectCardProps) => {
	const { project, tags, onEdit, onDelete } = props;

	const queryClient = useQueryClient();
	const editProject = useEditProjectById();

	const handleActiveToggle = async (checked: boolean) => {
		await editProject.mutateAsync({ id: project.id, project: { active: checked }});
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
						onClick={() => onEdit(project)}
					>
						<Icon name="edit-line" className="text-lg dark:text-white" />
					</button>
					<button
						className="opacity-100 md:opacity-0 group-hover:opacity-100"
						onClick={() => onDelete(project)}
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
					<Icon name="link" className="text-lg mr-2 flex-shrink-0 dark:text-white"/>
					<Link href={project.link!} className="text-sm text-ellipsis whitespace-nowrap">
						{project.link}
					</Link>
				</Flex.Row>
			</Show>
			<Show if={project.repo}>
				<Flex.Row className="items-center overflow-hidden text-ellipsis">
					<Icon name="github-fill" className="text-lg mr-2 flex-shrink-0 dark:text-white"/>
					<Link href={project.repo!} className="text-sm text-ellipsis whitespace-nowrap">
						{project.repo}
					</Link>
				</Flex.Row>
			</Show>
			<Show if={project.tags.length} else={<Copy className="text-xs my-2">No Tags added</Copy>}>
				<TagsDisplay tagIds={project.tags} tags={tags} className="mt-2"/>
			</Show>
			<Divider className="my-2" />
			<Copy className="text-sm">{project.description}</Copy>
		</Card>
	)
}

export interface ProjectCardProps {
	project: ProjectModel;
	tags: TagModel[];
	onEdit: (project: ProjectModel) => void;
	onDelete: (project: ProjectModel) => void;
}
