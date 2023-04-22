import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { MergedModelSchema } from "@/configs/firebase";

import { useCreateDetails, useEditDetail } from "@/library/api";
import { DetailSchema, DetailTypes } from "@/library/models";

import {
	Form,
	TextField,
	Flex,
	Select,
	Button,
	Modal,
	type ModalConfiguredProps
} from "@/components/core";

import { EducationFields } from "./_DetailsModal/EducationFields";
import { ContactFields } from "./_DetailsModal/ContactFields";
import { LanguageFields } from "./_DetailsModal/LanguageFields";
import { InterestFields } from "./_DetailsModal/InterestFields";
import { ActivityFields } from "./_DetailsModal/ActivityFields";

export const DetailsModal = (props: DetailsModalProps) => {
	const { isOpen, onClose, detail } = props;

	const queryClient = useQueryClient();
	const createDetails = useCreateDetails();
	const editDetail = useEditDetail();
	const [fields, setFields] = useState(populateFields(detail));

	const editFields = (data: Partial<DetailSchema>) => setFields(
		currentFields => ({...currentFields, ...data})
	);

	const editDataFields = (data: Partial<DetailSchema["data"]>) => editFields({
		data: { ...fields.data, ...(data as any) }
	})

	const handleSubmission = async () => {
		try {
			if (!detail) {
				await createDetails.mutateAsync([fields]);
			} else {
				await editDetail.mutateAsync({ ...fields, id: detail.id });
			}

			queryClient.invalidateQueries(["details"]);
			onClose();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {if (!isOpen) { setFields(populateFields()); } }, [isOpen]);

	useEffect(() => { setFields(populateFields(detail)) }, [detail]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Header className="text-2xl dark:text-white">
				{ !detail ? "Create new detail" : `Edit detail` }
			</Modal.Header>
			<hr className="my-2"></hr>
			<Form onSubmit={handleSubmission} className="space-y-5">
				<Flex className="flex-col space-y-2">
					<h3 className="text-lg font-light text-gray-700 tracking-tight dark:text-gray-300">
						Detail Information
					</h3>
					<TextField
						id="title"
						label="Title"
						placeholder="Detail Title"
						value={fields.title}
						onChange={title => editFields({ title })}
						required
					/>
					<h3 className="text-lg font-light text-gray-700 tracking-tight dark:text-gray-300">
						Type Information
					</h3>
					<Select
						value={fields.data.type}
						options={DetailTypes}
						onChange={value => editFields({ data: populateDataField(value) })}
						valueDisplay={value => (<span className="capitalize font-light">{value}</span>)}
						optionDisplay={option => (
							<p
								className="text-gray-700 dark:text-white px-3 py-2 capitalize text-sm font-light w-full"
							>
								{option}
							</p>
						)}
					/>
					<EducationFields fields={fields} editDataFields={editDataFields}/>
					<ContactFields fields={fields} editDataFields={editDataFields}/>
					<LanguageFields fields={fields} editDataFields={editDataFields}/>
					<InterestFields fields={fields} editDataFields={editDataFields}/>
					<ActivityFields fields={fields} editDataFields={editDataFields}/>
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

const populateFields = (detail?: MergedDetailSchema | null): DetailSchema | MergedDetailSchema => {
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
				startDate: (new Date).toString(),
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

type MergedDetailSchema = MergedModelSchema<DetailSchema>;

export interface DetailsModalProps extends ModalConfiguredProps {
	detail?: MergedDetailSchema | null;
}
