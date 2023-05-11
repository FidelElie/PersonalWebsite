import { LanguageProficiencies } from "@/library/models";

import type { DetailsFormFieldsInterface } from "../DetailsModal.data";

import { Copy, Select } from "@/components/core";

export const LanguageFields = (props: LanguageFieldsProps) => {
	const { fields, editDataFields } = props;

	const { data } = fields;

	if (data.type !== "language") { return null; }

	return (
		<>
			<Select
				value={data.proficiency}
				options={LanguageProficiencies}
				onChange={proficiency => editDataFields({ proficiency })}
				valueDisplay={value => (<span className="capitalize font-light">{value}</span>)}
				optionDisplay={option => (
					<Copy className="px-3 py-2 text-sm font-light w-full">{option}</Copy>
				)}
			/>
		</>
	)
}

interface LanguageFieldsProps extends DetailsFormFieldsInterface {}
