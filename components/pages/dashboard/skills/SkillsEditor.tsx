import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useQueryStatuses } from "@/library/hooks";
import { useCreateSkills, useEditSkillById } from "@/library/api";
import { TagModel, SkillModel, SkillSchema, Skill } from "@/library/models";

import {
	Form,
	TextField,
	Flex,
	Button,
	Heading,
	IconNames,
	Card,
	Loader,
	Show,
	type IconProps
} from "@/components/core";
import { TagsSelector, IconPicker } from "@/components/interfaces";

export const SkillsEditor = (props: SkillsEditorProps) => {
	const { tags, skill, skills, cancel } = props;

	const queryClient = useQueryClient();
	const createSkills = useCreateSkills();
	const editSkill = useEditSkillById();
	const [fields, setFields] = useState(populateFields(skill));
	const { isLoading } = useQueryStatuses([createSkills, editSkill]);

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
			cancel();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => { setFields(populateFields(skill)) }, [skill]);

	return (
		<Card className="p-3 md:w-1/2">
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
					<Show if={!isLoading} else={<Loader>Submitting skill changes... Please wait</Loader>}>
						<button
							type="button"
							className="underline text-sm text-blue-500"
							onClick={cancel}
						>
							Cancel
						</button>
						<Button.Submit>Submit</Button.Submit>
					</Show>
				</Flex>
			</Form>
		</Card>
	)
}

export interface SkillsEditorProps {
	tags: TagModel[];
	skill?: SkillModel;
	skills: SkillModel[],
	cancel: () => void
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
