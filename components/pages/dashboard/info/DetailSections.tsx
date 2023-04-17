import { DetailSchema } from "@/library/models";

import { Icon } from "@/components/core";

import { detailTypes } from "@/library/constants";

export const DetailSections = (props: DetailsSectionProps) => {
	const { details, openModal } = props;

	return (
		<div className="space-y-5">
			{
				detailTypes.map(detail => (
						<Detail
							key={detail}
							type={detail}
							openModal={openModal}
							details={details.filter(detailEntry => detailEntry.data.type === detail)}
						/>
					)
				)
			}
		</div>
	)
}

const Detail = (props: DetailProps) => {
	const { details, type, openModal } = props;

	return (
		<section className="group space-y-1">
			<div className="flex items-center space-x-2">
				<h2
					className="text-xl underline decoration-blue-500 underline-offset-4 text-gray-600 dark:text-white capitalize"
				>
					{type}
				</h2>
				<button
					className="transition-all opacity-0 group-hover:opacity-100"
					onClick={() => openModal(type)}
				>
					<Icon name="add-circle-line" className="text-lg text-gray-500 dark:text-gray-300" />
				</button>
			</div>
			{
				details.length ? (
					details.map(detail => (
						<>
						</>
					))
				) : (
					<p className="text-gray-500 dark:text-gray-300">No {type} details added</p>
				)
			}
		</section>
	)
}

type DetailTypes = DetailSchema["data"]["type"];

export interface DetailsSectionProps {
	details: DetailSchema[];
	openModal: (key: DetailTypes) => void
}

interface DetailProps extends DetailsSectionProps {
	type: DetailTypes;
}
