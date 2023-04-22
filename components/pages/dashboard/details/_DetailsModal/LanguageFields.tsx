import type { DetailsFormFieldsInterface } from "../DetailsModal.data";

import { Select } from "@/components/core";

export const LanguageFields = (props: LanguageFieldsProps) => {
	const { fields, editDataFields } = props;

	const { data } = fields;

	if (data.type !== "language") { return null; }

	return (
		<>
			<Select
				value={data.proficiency}
				options={["Native", "Fluent", "Basic"]}
				onChange={proficiency => editDataFields({ proficiency })}
				valueDisplay={value => (<span className="capitalize font-light">{value}</span>)}
				optionDisplay={option => (
					<p
						className="text-gray-700 dark:text-white px-3 py-2 text-sm font-light w-full"
					>
						{option}
					</p>
				)}
			/>
		</>
	)
}

interface LanguageFieldsProps extends DetailsFormFieldsInterface {}
