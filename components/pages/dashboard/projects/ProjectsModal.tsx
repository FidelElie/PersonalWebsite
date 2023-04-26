import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { MergedModelSchema } from "@/configs/firebase";

import { useCreateProjects, useEditProject } from "@/library/api";
import { ProjectSchema } from "@/library/models";

import {
	Form,
	TextField,
	LongTextField,
	Flex,
	Button,
	Modal,
	Heading,
	type ModalConfiguredProps
} from "@/components/core";

export const ProjectsModal = (props: ProjectsModalProps) => {
	const { isOpen, onClose, project } = props;

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
			<Modal.Header className="text-2xl dark:text-white">
				{!project ? "Create new project" : `Edit project`}
			</Modal.Header>
			<hr className="my-2"></hr>
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
					<Heading.Three className="text-lg tracking-tight">Optional Information</Heading.Three>
					<TextField
						id="link"
						label="Link"
						placeholder="Link"
						value={fields.link}
						onChange={link => editFields({ link })}
					/>
					<TextField
						id="repo"
						label="Repository"
						placeholder="Repository"
						value={fields.repo}
						onChange={repo => editFields({ repo })}
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
		repo: project?.repo ?? ""
	}
}

type MergedProjectSchema = MergedModelSchema<ProjectSchema>;

export interface ProjectsModalProps extends ModalConfiguredProps {
	project?: MergedProjectSchema | null;
}
