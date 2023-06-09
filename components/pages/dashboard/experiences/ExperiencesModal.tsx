import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";

import { useCreateExperiences, useEditExperienceById } from "@/library/api";
import { ExperienceSchema, ExperienceModel, TagModel } from "@/library/models";
import { toTimestamp } from "@/library/utilities";

import {
	Form,
	TextField,
	LongTextField,
	Flex,
	Button,
	Modal,
	DateField,
	Show,
	Heading,
	Divider,
	Copy,
	type ModalConfiguredProps
} from "@/components/core";
import { TagsSelector } from "@/components/interfaces";

export const ExperiencesModal = (props: ExperiencesModalProps) => {
	const { isOpen, onClose, experience, tags } = props;

	const queryClient = useQueryClient();
	const createExperiences = useCreateExperiences();
	const editExperience = useEditExperienceById();
	const [fields, setFields] = useState(populateFields(experience));

	const editFields = (data: Partial<ExperienceSchema>) => setFields(
		currentFields => ({ ...currentFields, ...data })
	);

	const updateHasEndDate = (checked: boolean) => {
		editFields({ endDate: !checked ? Timestamp.fromDate(new Date()) : null });
	}

	const handleSubmission = async () => {
		try {
			if (!experience) {
				await createExperiences.mutateAsync([fields]);
			} else {
				await editExperience.mutateAsync({
					id: experience.id,
					experience: { ...experience, ...fields }
				});
			}

			queryClient.invalidateQueries(["experiences"]);
			onClose();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => { if (!isOpen) { setFields(populateFields()); } }, [isOpen]);

	useEffect(() => { setFields(populateFields(experience)) }, [experience]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Header>{!experience ? "Create new experience" : `Edit experience`}</Modal.Header>
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
					<TextField
						id="organisation"
						label="Organisation"
						placeholder="Organisation"
						value={fields.organisation}
						onChange={organisation => editFields({ organisation })}
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
					<Heading.Three className="text-lg tracking-tight">Date Information</Heading.Three>
					<DateField
						id="start-date"
						label="Start Date"
						value={toTimestamp(fields.startDate).toDate()}
						onChange={date => editFields({ startDate: Timestamp.fromDate(date) })}
					/>
					<Flex className="items-center">
						<Show
							if={fields.endDate}
							else={<Copy.Label htmlFor="present">Experience until present</Copy.Label>}
						>
							{
								endDate => (
									<DateField
										id="end-date"
										label="End Date"
										value={toTimestamp(endDate).toDate()}
										onChange={date => editFields({ endDate: Timestamp.fromDate(date) })}
									/>
								)
							}

						</Show>
						<input
							id="present"
							type="checkbox"
							checked={!fields.endDate}
							className="ml-2.5 p-2 rounded border-gray-300 dark:border-gray-100"
							onChange={event => updateHasEndDate(event.target.checked)}
						/>
					</Flex>
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
						value={fields.link}
						onChange={link => editFields({ link })}
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
	experience?: ExperienceModel | null
): ExperienceSchema | ExperienceModel => {
	return {
		...(experience ? { experience: experience.id } : {}),
		title: experience?.title ?? "",
		organisation: experience?.organisation ?? "",
		description: experience?.description ?? "",
		link: experience?.link ?? "",
		startDate: experience?.startDate ?? Timestamp.fromDate(new Date()),
		endDate: experience?.endDate ?? null,
		tags: experience?.tags ?? [],
		active: experience?.active ?? true,
		points: experience?.points ?? []
	}
}

export interface ExperiencesModalProps extends ModalConfiguredProps {
	experience?: ExperienceModel | null;
	tags: TagModel[];
}
