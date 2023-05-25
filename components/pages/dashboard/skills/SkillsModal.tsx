import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { MergedModelSchema } from "@/configs/firebase";

import { useCreateSkills, useEditSkill } from "@/library/api";
import { SkillSchema, TagSchema } from "@/library/models";

import {
	Form,
	TextField,
	Flex,
	Button,
	Modal,
	Heading,
	Divider,
	Select,
	IconNames,
	Icon,
	Copy,
	type ModalConfiguredProps
} from "@/components/core";
import { TagsSelector } from "@/components/interfaces";

export const SkillsModal = (props: ProjectsModalProps) => {
	const { isOpen, onClose, skill, skills, tags } = props;

	const queryClient = useQueryClient();
	const createProjects = useCreateSkills();
	const editProject = useEditSkill();
	const [fields, setFields] = useState(populateFields(skill));

	const usedIcons = skills.filter(
		entry => skill ? skill.id !== entry.id : true
	).map(skill => skill.icon);

	const usableIcons = IconNames.filter(name => !usedIcons.includes(name));

	const editFields = (data: Partial<SkillSchema>) => setFields(
		currentFields => ({ ...currentFields, ...data })
	);

	const handleSubmission = async () => {
		try {
			if (!skill) {
				await createProjects.mutateAsync([fields]);
			} else {
				await editProject.mutateAsync({ ...fields, id: skill.id });
			}

			queryClient.invalidateQueries(["skills"]);
			onClose();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => { if (!isOpen) { setFields(populateFields()); } }, [isOpen]);

	useEffect(() => { setFields(populateFields(skill)) }, [skill]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Header>{!skill ? "Create new skill" : `Edit skill`}</Modal.Header>
			<Divider className="my-2"/>
			<Form onSubmit={handleSubmission} className="space-y-5">
				<Flex className="flex-col space-y-2">
					<TextField
						id="title"
						label="Title"
						placeholder="Title"
						value={fields.name}
						onChange={name => editFields({ name })}
						required
					/>
					<Select
						value={fields.icon}
						options={usableIcons}
						placeholder="Icon"
						optionDisplay={icon => <IconDisplay icon={icon!} />}
						valueDisplay={icon => <IconDisplay icon={icon!}/>}
						onChange={icon => editFields({ icon })}
						virtualize
					/>
					<Heading.Three className="text-lg tracking-tight">Tags Information</Heading.Three>
					<TagsSelector
						value={fields.tags}
						tags={tags}
						onChange={value => editFields({ tags: value })}
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

const IconDisplay = ({ icon } : { icon: typeof IconNames[number] }) => (
	<Flex className="items-center">
		<Icon name={icon} className="mr-2 text-lg" />
		<Copy className="capitalize">{icon?.split("-").join(" ")}</Copy>
	</Flex>
)

const populateFields = (
	skill?: MergedSkillSchema | null
): SkillSchema | MergedSkillSchema => {
	return {
		...(skill ? { skill: skill.id } : {}),
		name: skill?.name ?? "",
		icon: skill?.icon ?? "bug-2-fill",
		tags: skill?.tags ?? [],
		active: skill?.active ?? true
	}
}

type MergedSkillSchema = MergedModelSchema<SkillSchema>;

export interface ProjectsModalProps extends ModalConfiguredProps {
	skill?: MergedSkillSchema | null;
	skills: MergedSkillSchema[];
	tags: MergedModelSchema<TagSchema>[];
}
