import { MergedModelSchema } from "@/configs/firebase";
import { ProjectSchema, TagSchema } from "@/library/models";

import { Card, Copy, Divider, Flex, Heading, Icon, Link, Show } from "@/components/core";
import { TagsDisplay } from "@/components/interfaces";

export const ProjectCard = (props: ProjectCardProps) => {
	const { project, tags, onEdit, onDelete } = props;

	return (
		<Card className="group p-3">
			<Flex.Row className="items-center justify-between mb-2">
				<Heading.Three className="text-xl" underline>{project.title}</Heading.Three>
				<Flex.Row className="items-center space-x-2">
					<button
						className="opacity-0 group-hover:opacity-100"
						onClick={() => onEdit(project)}
					>
						<Icon name="edit-line" className="text-lg dark:text-white" />
					</button>
					<button
						className="opacity-0 group-hover:opacity-100"
						onClick={() => onDelete(project)}
					>
						<Icon name="delete-bin-line" className="text-lg dark:text-white" />
					</button>
				</Flex.Row>
			</Flex.Row>
			<Show if={project.link}>
				<Flex.Row className="items-center">
					<Icon name="link" className="text-lg mr-2 dark:text-white"/>
					<Link href={project.link!} className="text-sm">{project.link}</Link>
				</Flex.Row>
			</Show>
			<Show if={project.repo}>
				<Flex.Row className="items-center">
					<Icon name="github-fill" className="text-lg mr-2 dark:text-white"/>
					<Link href={project.repo!} className="text-sm">{project.repo}</Link>
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

type MergedProjectSchema = MergedModelSchema<ProjectSchema>;

export interface ProjectCardProps {
	project: MergedProjectSchema;
	tags: MergedModelSchema<TagSchema>[];
	onEdit: (project: MergedProjectSchema) => void;
	onDelete: (project: MergedProjectSchema) => void;
}
