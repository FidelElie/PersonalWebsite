import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateSkills, useEditSkillById } from "@/library/api";
import { Skill, SkillModel, SkillSchema, TagModel } from "@/library/models";

import {
	Form,
	TextField,
	Flex,
	Button,
	Modal,
	Heading,
	Divider,
	IconNames,
	type IconProps,
	type ModalConfiguredProps,
} from "@/components/core";
import { TagsSelector, IconPicker } from "@/components/interfaces";

export const SkillsModal = (props: ProjectsModalProps) => {
	const { isOpen, onClose, skill, skills, tags } = props;

	const queryClient = useQueryClient();
	const createSkills = useCreateSkills();
	const editSkill = useEditSkillById();
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
				await createSkills.mutateAsync([Skill.schema.parse(fields)]);
			} else {
				await editSkill.mutateAsync({
					id: skill.id,
					skill: Skill.schema.parse({ ...skill, ...fields })
				});
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
					<IconPicker
						id="skill-icon-picker"
						label="Skill Icon Picker"
						value={fields.icon}
						icons={usableIcons}
						onChange={(icon) => editFields({ icon })}
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

const populateFields = (
	skill?: SkillModel | null
): WithOptionalIcon<SkillSchema> | SkillModel => {
	return {
		...(skill ? { id: skill.id } : {}),
		name: skill?.name ?? "",
		icon: skill?.icon,
		tags: skill?.tags ?? [],
		active: skill?.active ?? true
	}
}

type WithOptionalIcon<T> = Omit<T, "icon"> & { icon?: IconProps["name"] };

export interface ProjectsModalProps extends ModalConfiguredProps {
	skill?: SkillModel | null;
	skills: SkillModel[];
	tags: TagModel[];
}
