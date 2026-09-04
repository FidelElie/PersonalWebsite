import { DetailsFormFieldsInterface } from "../DetailsEditor.data";

import { TextField } from "@/components/core";

export const InterestFields = (props: InterestFieldsProps) => {
	const { fields, editDataFields } = props;

	const { data } = fields;

	if (data.type !== "interest") { return null; }

	return (
		<TextField
			id="detail"
			label="Detail"
			placeholder="Detail"
			value={data.detail}
			onChange={detail => editDataFields({ detail })}
			required
		/>
	)

}

interface InterestFieldsProps extends DetailsFormFieldsInterface {}
