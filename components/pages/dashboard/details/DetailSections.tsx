import { DetailSchema, DetailModel, DETAIL_TYPES } from "@/library/models";
import { toTimestamp } from "@/library/utilities";

import { Box, Copy, Flex, For, Heading, Icon, Show } from "@/components/core";

export const DetailSections = (props: DetailsSectionProps) => {
	const { details, startEditing, startDeletion } = props;

	return (
		<Box className="space-y-5">
			<For each={DETAIL_TYPES}>
				{ detail => (
					<DetailPoint
						key={detail}
						type={detail}
						startEditing={startEditing}
						startDeletion={startDeletion}
						details={details.filter(detailEntry => detailEntry.data.type === detail)}
					/>
				)}
			</For>
		</Box>
	)
}

const DetailPoint = (props: DetailProps) => {
	const { details, type, startEditing, startDeletion } = props;

	return (
		<Box as="section" className="space-y-2">
			<Heading.Two className="text-xl mb-2.5 capitalize" underline>{ type }</Heading.Two>
			<For each={details} else={<Copy>No {type} details added</Copy>}>
				{ detail => (
					<div
						key={detail.id}
						className="group border bg-white dark:bg-gray-700 rounded px-3 py-1.5 dark:border-transparent"
					>
						<Flex.Row className="items-center justify-between md:mb-0">
							<Heading.Three className="text-lg">{detail.title}</Heading.Three>
							<Flex.Row className="items-center space-x-2">
								<button
									className="opacity-100 md:opacity-0 group-hover:opacity-100"
									onClick={() => startEditing(detail)}
								>
									<Icon name="edit-line" className="text-lg dark:text-white" />
								</button>
								<button
									className="opacity-100 md:opacity-0 group-hover:opacity-100"
									onClick={() => startDeletion(detail)}
								>
									<Icon name="delete-bin-line" className="text-lg dark:text-white" />
								</button>
							</Flex.Row>
						</Flex.Row>
						<Box className="text-sm">
							<Show if={detail.data.type === "education" ? detail.data : null}>
								{ education => (
									<Flex.Column>
										<Copy className="font-light text-sm">
											{education.qualification}
										</Copy>
										<Flex.Row className="items-center text-sm">
											<Icon name="calendar-line" className="text-lg mr-2" />
											<Copy.Inline>
												{ toTimestamp(education.startDate).toDate().toLocaleDateString() }
											</Copy.Inline>
											<Copy.Inline>&nbsp;-&nbsp;</Copy.Inline>
											<Copy.Inline>
												<Show if={education.endDate} else="Present">
													{ endDate => toTimestamp(endDate).toDate().toLocaleDateString() }
												</Show>
											</Copy.Inline>
										</Flex.Row>
									</Flex.Column>
								)}
							</Show>
							<Show if={detail.data.type === "contact" ? detail.data : null}>
								{ contact => <Copy className="text-sm">{contact.value}</Copy> }
							</Show>
							<Show if={detail.data.type === "language" ? detail.data : null}>
								{ language => <Copy className="text-sm">{language.proficiency}</Copy> }
							</Show>
							<Show
								if={
									(detail.data.type === "interest" || detail.data.type === "activity") ?
									detail.data : null
								}
							>
								{ data => <Copy className="text-sm">{data.detail}</Copy>}
							</Show>
						</Box>
					</div>
				)}
			</For>
		</Box>
	)
}

type DETAIL_TYPES = DetailSchema["data"]["type"];

export interface DetailsSectionProps {
	details: DetailModel[];
	startEditing: (detail: DetailModel) => void;
	startDeletion: (detail: DetailModel) => void;
}

interface DetailProps extends DetailsSectionProps { type: DETAIL_TYPES; }
