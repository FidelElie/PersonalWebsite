import { Timestamp } from "firebase/firestore";

import type { DetailsFormFieldsInterface } from "../DetailsEditor.data";
import { toTimestamp } from "@/library/utilities";

import { Copy, DateField, Flex, Show, TextField } from "@/components/core";

export const EducationFields = (props: EducationFieldsProps) => {
	const { fields, editDataFields } = props;

	const { data } = fields;

	if (data.type !== "education") { return null; }

	const updateHasEndDate = (checked: boolean) => {
		editDataFields({ endDate: !checked ? Timestamp.fromDate(new Date()) : null });
	}

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
			<DateField
				id="start-date"
				label="Start Date"
				value={toTimestamp(data.startDate).toDate()}
				onChange={date => editDataFields({ startDate: Timestamp.fromDate(date)})}
			/>
			<Flex className="items-center">
				<Show
					if={data.endDate}
					else={(
						<Copy.Label htmlFor="present" className="text-sm">
							Experience until present
						</Copy.Label>
					)}
				>
					{
						endDate => (
							<DateField
								id="end-date"
								label="End Date"
								value={toTimestamp(endDate).toDate()}
								onChange={date => editDataFields({ endDate: Timestamp.fromDate(date) })}
							/>
						)
					}
				</Show>
				<input
					id="present"
					type="checkbox"
					checked={!data.endDate}
					className="ml-2.5 p-2 rounded border-gray-300 dark:border-gray-100"
					onChange={event => updateHasEndDate(event.target.checked)}
				/>
			</Flex>
		</>
	)
}

interface EducationFieldsProps extends DetailsFormFieldsInterface {}