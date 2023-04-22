import type { DetailsFormFieldsInterface } from "../DetailsModal.data";

import { Select, TextField } from "@/components/core";

export const ContactFields = (props: DetailsFormContactFieldsProps) => {
	const { fields, editDataFields } = props;

	const { data } = fields;

	if (data.type !== "contact") { return null; }

	return (
		<>
			<Select
				value={data.medium}
				options={["phone", "linkedin", "instagram", "facebook", "github", "location", "email"]}
				onChange={medium => editDataFields({ medium })}
				valueDisplay={value => (<span className="capitalize font-light">{value}</span>)}
				optionDisplay={option => (
					<p
						className="text-gray-700 dark:text-white px-3 py-2 capitalize text-sm font-light w-full"
					>
						{option}
					</p>
				)}
			/>
			<TextField
				id="value"
				label="Value"
				placeholder="Value (link, number)"
				value={data.value}
				onChange={value => editDataFields({ value })}
				type={data.medium === "email" ? "email" : "text"}
				required
			/>
		</>
	)
}

interface DetailsFormContactFieldsProps extends DetailsFormFieldsInterface { }
