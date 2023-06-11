import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";

import { toTimestamp } from "@/library/utilities";
import { useQueryStatuses } from "@/library/hooks";
import { useCreateExperiences, useEditExperienceById } from "@/library/api";
import { ExperienceModel, ExperienceSchema, TagModel, Experience } from "@/library/models";

import {
	Button,
	Card,
	Copy,
	DateField,
	Flex,
	Form,
	Heading,
	Loader,
	LongTextField,
	Show,
	TextField,
	Toggle
} from "@/components/core";
import { TagsSelector, PointsEditor } from "@/components/interfaces";

export const ExperiencesEditor = (props: ExperienceEditorProps) => {
	const { experience, tags, cancel } = props;

	const queryClient = useQueryClient();
	const createExperiences = useCreateExperiences();
	const editExperience = useEditExperienceById();
	const [fields, setFields] = useState(populateFields(experience));
	const { isLoading } = useQueryStatuses([createExperiences, editExperience]);

	const editFields = (data: Partial<ExperienceSchema>) => setFields(
		currentFields => ({ ...currentFields, ...data })
	);

	const updateHasEndDate = (checked: boolean) => {
		editFields({ endDate: !checked ? Timestamp.fromDate(new Date()) : null });
	}

	const handleSubmission = async () => {
		try {
			if (!experience) {
				await createExperiences.mutateAsync([Experience.schema.parse(fields)]);
			} else {
				await editExperience.mutateAsync({
					id: experience.id,
					experience: Experience.schema.parse({ ...experience, ...fields })
				});
			}

			queryClient.invalidateQueries(["experiences"]);
			cancel();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => { setFields(populateFields(experience)) }, [experience]);

	return (
		<Card className="p-3 md:w-1/2">
			<Form onSubmit={handleSubmission} className="space-y-5">
				<Flex.Column className="space-y-2">
					<Flex.Row className="space-x-2 items-center">
						<Toggle
							className="w-12"
							label="Active experience"
							checked={fields.active}
							onChange={active => editFields({ active })}
						/>
						<Copy className="text-sm">Active Experience</Copy>
					</Flex.Row>
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
					<PointsEditor
						points={fields.points}
						onChange={(points) => editFields({ points })}
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
				</Flex.Column>
				<Flex.Row className="items-center justify-between">
					<Show if={!isLoading} else={<Loader>Submitting experience change... Please wait</Loader>}>
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

export interface ExperienceEditorProps {
	experience?: ExperienceModel;
	tags: TagModel[];
	cancel: () => void;
}
