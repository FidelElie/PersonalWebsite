import { DetailsFormFieldsInterface } from "../DetailsModal.data";

import { TextField } from "@/components/core";

export const ActivityFields = (props: ActivityFieldsProps) => {
	const { fields, editDataFields } = props;

	const { data } = fields;

	if (data.type !== "activity") { return null; }

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

interface ActivityFieldsProps extends DetailsFormFieldsInterface {}
