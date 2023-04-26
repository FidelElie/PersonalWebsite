import { MergedModelSchema } from "@/configs/firebase";

import { DetailSchema, DetailTypes } from "@/library/models";

import { Flex, Icon } from "@/components/core";

export const DetailSections = (props: DetailsSectionProps) => {
	const { details, startEditing, startDeletion } = props;

	return (
		<div className="space-y-5 md:w-1/2">
			{
				DetailTypes.map(detail => (
						<Detail
							key={detail}
							type={detail}
							startEditing={startEditing}
							startDeletion={startDeletion}
							details={details.filter(detailEntry => detailEntry.data.type === detail)}
						/>
					)
				)
			}
		</div>
	)
}

const Detail = (props: DetailProps) => {
	const { details, type, startEditing, startDeletion } = props;

	return (
		<section className="space-y-2">
			<h2
				className="text-xl underline mb-2.5 decoration-blue-500 underline-offset-4 dark:text-white capitalize"
			>
				{type}
			</h2>
			{
				details.length ? (
					details.map(detail => (
						<div
							key={detail.id}
							className="group border bg-white dark:bg-gray-700 rounded px-3 py-1.5 dark:border-transparent"
						>
							<Flex className="items-center justify-between">
								<h3 className="text-lg dark:text-white">{detail.title}</h3>
								<Flex className="items-center space-x-2">
									<button
										className="opacity-0 group-hover:opacity-100"
										onClick={() => startEditing(detail)}
									>
										<Icon name="edit-line" className="text-lg dark:text-white"/>
									</button>
									<button
										className="opacity-0 group-hover:opacity-100"
										onClick={() => startDeletion(detail)}
									>
										<Icon name="delete-bin-line" className="text-lg dark:text-white"/>
									</button>
								</Flex>
							</Flex>
							{
								detail.data.type === "education" && (
									<div>
										<span className="font-light text-sm text-gray-500 dark:text-gray-300">
											{detail.data.qualification}
										</span>
									</div>
								)
							}
							{
								detail.data.type === "contact" && (
									<div>
										<span className="font-light text-sm text-gray-500 dark:text-gray-300">
											{detail.data.value}
										</span>
									</div>
								)
							}
							{
								detail.data.type === "language" && (
									<div>
										<span className="font-light text-sm text-gray-500 dark:text-gray-300">
											{detail.data.proficiency}
										</span>
									</div>
								)
							}
							{
								(detail.data.type === "interest" || detail.data.type === "activity") && (
									<div>
										<span className="font-light text-sm text-gray-500 dark:text-gray-300">
											{detail.data.detail}
										</span>
									</div>
								)
							}
						</div>
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
	details: MergedModelSchema<DetailSchema>[];
	startEditing: (detail: MergedModelSchema<DetailSchema>) => void;
	startDeletion: (detail: MergedModelSchema<DetailSchema>) => void;
}

interface DetailProps extends DetailsSectionProps {
	type: DetailTypes;
}
