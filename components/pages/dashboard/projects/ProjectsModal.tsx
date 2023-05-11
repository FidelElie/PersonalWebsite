import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { MergedModelSchema } from "@/configs/firebase";

import { useCreateProjects, useEditProject } from "@/library/api";
import { ProjectSchema, TagSchema } from "@/library/models";

import {
	Form,
	TextField,
	LongTextField,
	Flex,
	Button,
	Modal,
	Heading,
	Divider,
	Icon,
	type ModalConfiguredProps
} from "@/components/core";
import { TagsSelector } from "@/components/interfaces";

export const ProjectsModal = (props: ProjectsModalProps) => {
	const { isOpen, onClose, project, tags } = props;

	const queryClient = useQueryClient();
	const createProjects = useCreateProjects();
	const editProject = useEditProject();
	const [fields, setFields] = useState(populateFields(project));


	const editFields = (data: Partial<ProjectSchema>) => setFields(
		currentFields => ({ ...currentFields, ...data })
	);

	const handleSubmission = async () => {
		try {
			if (!project) {
				await createProjects.mutateAsync([fields]);
			} else {
				await editProject.mutateAsync({ ...fields, id: project.id });
			}

			queryClient.invalidateQueries(["projects"]);
			onClose();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => { if (!isOpen) { setFields(populateFields()); } }, [isOpen]);

	useEffect(() => { setFields(populateFields(project)) }, [project]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Header>{!project ? "Create new project" : `Edit project`}</Modal.Header>
			<Divider className="my-2"/>
			<Form onSubmit={handleSubmission} className="space-y-5">
				<Flex className="flex-col space-y-2">
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
						left={<Icon name="github-fill" className="text-xl dark:text-white"/>}
					/>
				</Flex>
				<Flex className="items-center justify-between">
					<button
						type="button"
						className="underline text-sm text-blue-500"
						onClick={onClose}
					>
						Cancel
					</button>
					<Button.Submit>Submit</Button.Submit>
				</Flex>
			</Form>
		</Modal>
	)
}

const populateFields = (
	project?: MergedProjectSchema | null
): ProjectSchema | MergedProjectSchema => {
	return {
		...(project ? { project: project.id } : {}),
		title: project?.title ?? "",
		description: project?.description ?? "",
		link: project?.link ?? "",
		repo: project?.repo ?? "",
		tags: project?.tags ?? []
	}
}

type MergedProjectSchema = MergedModelSchema<ProjectSchema>;

export interface ProjectsModalProps extends ModalConfiguredProps {
	project?: MergedProjectSchema | null;
	tags: MergedModelSchema<TagSchema>[];
}
