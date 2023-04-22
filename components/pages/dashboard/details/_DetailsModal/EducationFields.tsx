import type { DetailsFormFieldsInterface } from "../DetailsModal.data";

import { TextField } from "@/components/core";

export const EducationFields = (props: EducationFieldsProps) => {
	const { fields, editDataFields } = props;

	const { data } = fields;

	if (data.type !== "education") { return null; }

	return (
		<>
			<TextField
				id="qualification"
				label="Qualification"
				placeholder="Qualification e.g Bachelors"
				value={data.qualification}
				onChange={qualification => editDataFields({ qualification })}
				required
			/>
			<TextField
				id="organisation"
				label="Organisation"
				placeholder="Organisation"
				value={data.organisation}
				onChange={organisation => editDataFields({ organisation })}
				required
			/>
		</>
	)
}

interface EducationFieldsProps extends DetailsFormFieldsInterface {}
