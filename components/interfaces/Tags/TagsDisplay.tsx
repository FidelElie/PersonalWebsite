import { clc } from "@/library/utilities";
import { TagSchema } from "@/library/models";
import { MergedModelSchema } from "@/configs/firebase";

import { Box, Card, Copy, Flex, For } from "@/components/core";

export const TagsDisplay = (props: TagsDisplayProps) => {
	const { className, tagIds, tags = [] } = props;

	const chosenTags = tags.filter(tag => tagIds.includes(tag.id));

	return (
		<Flex.Row className={clc("items-center flex-wrap", className)}>
			<For each={chosenTags}>
				{ tag => (
					<Box as="span" key={tag.id} className="p-0.5">
						<Card>
							<Flex as="span" className="p-1 items-center">
								<Copy className="text-xs">{tag.name}</Copy>
							</Flex>
						</Card>
					</Box>
				)}
			</For>
		</Flex.Row>
	)
}

export interface TagsDisplayProps {
	className?: string,
	tagIds: string[];
	tags: MergedModelSchema<TagSchema>[];
}
