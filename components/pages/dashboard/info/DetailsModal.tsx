import { useState } from "react";

import { DetailSchema } from "@/library/models";
import { detailTypes } from "@/library/constants";

import {
	Form,
	Modal,
	TextField,
	Button,
	Flex,
	Select,
	type ModalConfiguredProps,
	Show,
} from "@/components/core";

export const DetailsModal = (props: DetailsModalProps) => {
	const { isOpen, onClose, detail } = props;

	const [fields, setFields] = useState(populateFields(detail));

	const editFields = (data: Partial<DetailSchema>) => setFields(
		currentFields => ({...currentFields, ...data})
	);

	const handleSubmission = async () => {

	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<Modal.Header
				as="h2"
				className="text-xl mb-5 underline decoration-blue-500 underline-offset-4 dark:text-white"
			>
				Create Detail
			</Modal.Header>
			<Form onSubmit={handleSubmission} className="space-y-5">
				<Flex className="flex-col space-y-2">
					<TextField
						id="title"
						label="Title"
						placeholder="Detail Title"
						value={fields.title}
						onChange={title => editFields({ title })}
						required
					/>
					<TextField
						id="description"
						label="Description"
						placeholder="Detail Description"
						value={fields.description}
						onChange={description => editFields({ description })}
						required
					/>
					<Select
						value={fields.data.type}
						options={detailTypes}
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
					<Show if={(() => fields.data.type === "education" ? fields.data : null)()}>
						{ education => (
							<>
								<TextField
									id="qualification"
									label="Qualification"
									placeholder="Qualification e.g Bachelors"
									value={education.qualification}
									// onChange={description => editFields({ description })}
									required
								/>
								<TextField
									id="organisation"
									label="Organisation"
									placeholder="Organisation"
									value={education.organisation}
									// onChange={description => editFields({ description })}
									required
								/>
							</>
						)}
					</Show>
				</Flex>
				<Flex className="items-center justify-between">
					<button
						className="underline text-gray-700 font-light underline-offset-4 dark:text-white"
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

const populateFields = (detail?: DetailSchema): DetailSchema => {
	return {
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
			return { type: "activity" }
		case "interest":
			return { type: "interest", detail: "" }
		case "language":
			return { type: "language", proficiency: "Basic" }
		default:
			throw new Error("Invalid dat type for detail")
	}
}

export interface DetailsModalProps extends ModalConfiguredProps {
	detail?: DetailSchema;
}
