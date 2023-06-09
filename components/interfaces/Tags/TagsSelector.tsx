import type { MouseEvent } from "react";
import type { TagModel } from "@/library/models";

import { Box, Card, Copy, Flex, For, Icon, Select, Show } from "@/components/core"

export const TagsSelector = (props: TagsSelectorProps) => {
	const { value, tags, onChange } = props;

	tags.sort((a, b) => a.name.localeCompare(b.name))

	const removeTag = (event: MouseEvent<HTMLElement>, idToRemove: string) => {
		event.stopPropagation();
		onChange(value.filter(tagId => tagId !== idToRemove));
	}

	return (
		<Select
			value={value}
			accessor={tag => tag.id}
			options={tags}
			onChange={onChange}
			placeholder="Select Tags"
			selectClassName="flex flex-wrap min-h-12"
			valueDisplay={tags => (
				<For each={tags || []}>
					{
						tag => (
							<Box as="span" key={tag.id} className="p-0.5">
								<Card>
									<Flex as="span" className="p-1 items-center">
										<Copy className="text-xs mr-2">{tag.name}</Copy>
										<Box role="button" onClick={(event) => removeTag(event, tag.id)}>
											<Icon name="close-circle-line" className="text-lg text-gray-500" />
										</Box>
									</Flex>
								</Card>
							</Box>
						)
					}
				</For>
			)}
			optionDisplay={(option, selected) => (
				<Flex.Row className="items-center justify-between w-fill">
					<Copy className="px-3 py-2 capitalize text-sm w-full">{option.name}</Copy>
					<Show if={selected}>
						<Icon name="check-line" className="text-xl mr-2 dark:text-white" />
					</Show>
				</Flex.Row>
			)}
			multiple
		/>
	)
}

export interface TagsSelectorProps {
	value: string[],
	tags: TagModel[],
	onChange: (tags: string[]) => void
}
