import { CONTACT_MEDIUMS } from "@/library/models";

import type { DetailsFormFieldsInterface } from "../DetailsModal.data";

import { Copy, Select, TextField } from "@/components/core";

export const ContactFields = (props: DetailsFormContactFieldsProps) => {
	const { fields, editDataFields } = props;

	const { data } = fields;

	if (data.type !== "contact") { return null; }

	return (
		<>
			<Select
				value={data.medium}
				options={CONTACT_MEDIUMS}
				onChange={medium => editDataFields({ medium })}
				valueDisplay={value => (<Copy.Inline className="capitalize">{value}</Copy.Inline>)}
				optionDisplay={option => (
					<Copy className="px-3 py-2 capitalize text-sm w-full">{option}</Copy>
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
