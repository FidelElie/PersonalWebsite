import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";

import { useQueryStatuses } from "@/library/hooks";
import { useCreateDetails, useEditDetailById } from "@/library/api";
import { DETAIL_TYPES, DetailModel, DetailSchema } from "@/library/models";

import {
	Card,
	Form,
	Flex,
	Heading,
	TextField,
	Select,
	Copy,
	Button,
	Show,
	Loader
} from "@/components/core";

import { ActivityFields } from "./_DetailsEditor/ActivityFields";
import { ContactFields } from "./_DetailsEditor/ContactFields";
import { EducationFields } from "./_DetailsEditor/EducationFields";
import { InterestFields } from "./_DetailsEditor/InterestFields";
import { LanguageFields } from "./_DetailsEditor/LanguageFields";

export const DetailsEditor = (props: DetailsEditorProps) => {
	const { detail, cancel } = props;

	const queryClient = useQueryClient();
	const createDetails = useCreateDetails();
	const editDetail = useEditDetailById();
	const [fields, setFields] = useState(populateFields(detail));
	const { isLoading } = useQueryStatuses([createDetails, editDetail]);

	const editFields = (data: Partial<DetailSchema>) => setFields(
		currentFields => ({ ...currentFields, ...data })
	);

	const editDataFields = (data: Partial<DetailSchema["data"]>) => editFields({
		data: { ...fields.data, ...(data as any) }
	})

	const handleSubmission = async () => {
		try {
			if (!detail) {
				await createDetails.mutateAsync([fields]);
			} else {
				await editDetail.mutateAsync({ id: detail.id, detail: { ...detail, ...fields } });
			}

			queryClient.invalidateQueries(["details"]);
			cancel();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => { setFields(populateFields(detail)) }, [detail]);

	return (
		<Card className="p-3 md:w-1/2">
			<Form onSubmit={handleSubmission} className="space-y-5">
				<Flex className="flex-col space-y-2">
					<Heading.Three className="text-lg">Detail Information</Heading.Three>
					<TextField
						id="title"
						label="Title"
						placeholder="Detail Title"
						value={fields.title}
						onChange={title => editFields({ title })}
						required
					/>
					<Heading.Three className="text-lg">Type Information</Heading.Three>
					<Select
						value={fields.data.type}
						options={DETAIL_TYPES}
						onChange={value => editFields({ data: populateDataField(value) })}
						valueDisplay={value => <Copy.Inline className="capitalize">{value}</Copy.Inline>}
						optionDisplay={option => (
							<Copy className="px-3 py-2 capitalize text-sm w-full">{option}</Copy>
						)}
					/>
					<EducationFields fields={fields} editDataFields={editDataFields} />
					<ContactFields fields={fields} editDataFields={editDataFields} />
					<LanguageFields fields={fields} editDataFields={editDataFields} />
					<InterestFields fields={fields} editDataFields={editDataFields} />
					<ActivityFields fields={fields} editDataFields={editDataFields} />
				</Flex>
				<Flex className="items-center justify-between">
					<Show if={!isLoading} else={<Loader>Submitting detail changes... Please wait</Loader>}>
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

const populateFields = (detail?: DetailModel | null): DetailSchema | DetailModel => {
	return {
		...(detail ? { id: detail.id } : {}),
		title: detail ? detail.title : "",
		description: (detail && detail.description) ? detail.description : "",
		data: detail ? detail.data : populateDataField("education")
	}
}

const populateDataField = (type: DetailSchema["data"]["type"]): DetailSchema["data"] => {
	switch (type) {
		case "education":
			return {
				type: "education",
				qualification: "",
				organisation: "",
				startDate: Timestamp.fromDate(new Date()),
				endDate: null
			}
		case "contact":
			return { type: "contact", medium: "phone", value: "" }
		case "activity":
			return { type: "activity", detail: "" }
		case "interest":
			return { type: "interest", detail: "" }
		case "language":
			return { type: "language", proficiency: "Basic" }
		default:
			throw new Error("Invalid dat type for detail");
	}
}

export interface DetailsEditorProps {
	detail?: DetailModel;
	cancel: () => void;
}
