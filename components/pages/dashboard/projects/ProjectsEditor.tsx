import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useQueryStatuses } from "@/library/hooks";
import { useCreateProjects, useEditProjectById } from "@/library/api";
import { ProjectModel, ProjectSchema, TagModel, Project } from "@/library/models";

import {
	Button,
	Card,
	Copy,
	Flex,
	Form,
	Heading,
	Icon,
	Loader,
	LongTextField,
	Show,
	TextField,
	Toggle
} from "@/components/core";
import { TagsSelector, PointsEditor } from "@/components/interfaces";

export const ProjectsEditor = (props: ProjectsEditorProps) => {
	const { project, tags, cancel } = props;

	const queryClient = useQueryClient();
	const createProjects = useCreateProjects();
	const editProject = useEditProjectById();
	const [fields, setFields] = useState(populateFields(project));
	const { isLoading } = useQueryStatuses([createProjects, editProject]);

	const editFields = (data: Partial<ProjectSchema>) => setFields(
		currentFields => ({ ...currentFields, ...data })
	);

	const handleSubmission = async () => {
		try {
			if (!project) {
				await createProjects.mutateAsync([Project.schema.parse(fields)]);
			} else {
				await editProject.mutateAsync({
					id: project.id,
					project: Project.schema.parse({ ...project, ...fields })
				});
			}

			queryClient.invalidateQueries(["projects"]);
			cancel();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => { setFields(populateFields(project)) }, [project]);

	return (
		<Card className="p-3 md:w-1/2">
			<Form onSubmit={handleSubmission} className="space-y-5">
				<Flex.Column className="flex-col space-y-2">
					<Flex.Row className="space-x-2 items-center">
						<Toggle
							className="w-12"
							label="Active project"
							checked={fields.active}
							onChange={active => editFields({ active })}
						/>
						<Copy className="text-sm">Active Project</Copy>
					</Flex.Row>
					<TextField
						id="title"
						label="Title"
						placeholder="Title"
						value={fields.title}
						onChange={title => editFields({ title })}
						required
					/>
					<LongTextField
						id="description"
						label="Description"
						placeholder="Description"
						value={fields.description}
						onChange={description => editFields({ description })}
						rows={5}
						required
					/>
					<PointsEditor
						points={fields.points}
						onChange={points => editFields({ points })}
					/>
					<Heading.Three className="text-lg tracking-tight">Tags Information</Heading.Three>
					<TagsSelector
						value={fields.tags}
						tags={tags}
						onChange={value => editFields({ tags: value })}
					/>
					<Heading.Three className="text-lg tracking-tight">Optional Information</Heading.Three>
					<TextField
						id="link"
						label="Link"
						placeholder="Link"
						className="flex items-center space-x-1 pl-2"
						value={fields.link}
						onChange={link => editFields({ link })}
						left={<Icon name="link" className="text-xl dark:text-white" />}
					/>
					<TextField
						id="repo"
						label="Repository"
						placeholder="Repository"
						className="flex items-center space-x-1 pl-2"
						value={fields.repo}
						onChange={repo => editFields({ repo })}
						left={<Icon name="github-fill" className="text-xl dark:text-white" />}
					/>
				</Flex.Column>
				<Flex.Row className="items-center justify-between">
					<Show if={!isLoading} else={<Loader>Submitting project changes... Please wait</Loader>}>
						<button
							type="button"
							className="underline text-sm text-blue-500"
							onClick={cancel}
						>
							Cancel
						</button>
						<Button.Submit>Submit</Button.Submit>
					</Show>
				</Flex.Row>
			</Form>
		</Card>
	)
}

const populateFields = (project?: ProjectModel | null): ProjectSchema | ProjectModel => {
	return {
		...(project ? { project: project.id } : {}),
		title: project?.title ?? "",
		description: project?.description ?? "",
		link: project?.link ?? "",
		repo: project?.repo ?? "",
		tags: project?.tags ?? [],
		active: project?.active ?? true,
		points: project?.points ?? []
	}
}

export interface ProjectsEditorProps {
	project?: ProjectModel;
	tags: TagModel[];
	cancel: () => void;
}
