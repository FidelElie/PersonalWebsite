import { DETAIL_TYPES, DetailModel } from "@/library/models";
import { toTimestamp } from "@/library/utilities";

import { Box, Copy, Flex, For, Heading, Icon, Show } from "@/components/core";

export const DetailsDisplay = (props: DetailsDisplayProps) => {
	const { details, update, delete: _delete } = props;

	return (
		<Box className="space-y-5">
			<For each={DETAIL_TYPES}>
				{detail => (
					<DetailPoint
						key={detail}
						type={detail}
						update={update}
						delete={_delete}
						details={details.filter(detailEntry => detailEntry.data.type === detail)}
					/>
				)}
			</For>
		</Box>
	)
}

const DetailPoint = (props: DetailPointProps) => {
	const { details, type, update, delete: _delete } = props;

	return (
		<Box as="section" className="space-y-2">
			<Heading.Two className="text-xl mb-2.5 capitalize" underline>{type}</Heading.Two>
			<For each={details} else={<Copy>No {type} details added</Copy>}>
				{detail => (
					<div
						key={detail.id}
						className="group border bg-white dark:bg-gray-700 rounded px-3 py-1.5 dark:border-transparent"
					>
						<Flex.Row className="items-center justify-between md:mb-0">
							<Heading.Three className="text-lg">{detail.title}</Heading.Three>
							<Flex.Row className="items-center space-x-2">
								<button
									className="opacity-100 md:opacity-0 group-hover:opacity-100"
									onClick={() => update(detail.id)}
								>
									<Icon name="edit-line" className="text-lg dark:text-white" />
								</button>
								<button
									className="opacity-100 md:opacity-0 group-hover:opacity-100"
									onClick={() => _delete(detail.id)}
								>
									<Icon name="delete-bin-line" className="text-lg dark:text-white" />
								</button>
							</Flex.Row>
						</Flex.Row>
						<Box className="text-sm">
							<Show if={detail.data.type === "education" ? detail.data : null}>
								{education => (
									<Flex.Column>
										<Copy className="font-light text-sm">
											{education.qualification}
										</Copy>
										<Flex.Row className="items-center text-sm">
											<Icon name="calendar-line" className="text-lg mr-2 dark:text-white" />
											<Copy.Inline>
												{toTimestamp(education.startDate).toDate().toLocaleDateString()}
											</Copy.Inline>
											<Copy.Inline>&nbsp;-&nbsp;</Copy.Inline>
											<Copy.Inline>
												<Show if={education.endDate} else="Present">
													{endDate => toTimestamp(endDate).toDate().toLocaleDateString()}
												</Show>
											</Copy.Inline>
										</Flex.Row>
									</Flex.Column>
								)}
							</Show>
							<Show if={detail.data.type === "contact" ? detail.data : null}>
								{contact => <Copy className="text-sm">{contact.value}</Copy>}
							</Show>
							<Show if={detail.data.type === "language" ? detail.data : null}>
								{language => <Copy className="text-sm">{language.proficiency}</Copy>}
							</Show>
							<Show
								if={
									(detail.data.type === "interest" || detail.data.type === "activity") ?
										detail.data : null
								}
							>
								{data => <Copy className="text-sm">{data.detail}</Copy>}
							</Show>
						</Box>
					</div>
				)}
			</For>
		</Box>
	)
}


type SharedProps = {
	update: (id: string) => void;
	delete: (id: string) => void;
}

export interface DetailsDisplayProps extends SharedProps { details: DetailModel[]; }

interface DetailPointProps extends DetailsDisplayProps { type: typeof DETAIL_TYPES[number] }
