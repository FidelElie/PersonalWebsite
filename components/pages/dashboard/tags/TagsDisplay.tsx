import { Dispatch, SetStateAction, useState } from "react";

import { TagModel } from "@/library/models";

import { Grid, For, Card, Copy, Show, Flex, Icon } from "@/components/core";

import { TagCard } from "./_TagsDisplay/TagCard";
import { TagInput } from "./_TagsDisplay/TagInput";

export const TagsDisplay = (props: TagsDisplayProps) => {
	const { tags, search, selected, setSelected } = props;

	const [showInput, setShowInput] = useState(false);

	const filteredTags = !search ? tags : tags.filter(
		tag => tag.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<Grid className="gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<Show
				if={showInput}
				else={(
					<button
						className="flex p-5 items-center justify-center border bg-white dark:bg-gray-700 rounded dark:border-transparent"
						onClick={() => setShowInput(true)}
					>
						<Icon name="add-circle-line" className="text-2xl text-primary" />
					</button>
				)}
			>
				<Flex.Row className="p-5 border bg-white dark:bg-gray-700 rounded dark:border-transparent">
					<TagInput onClose={() => setShowInput(false)} />
				</Flex.Row>
			</Show>
			<For
				each={filteredTags}
				else={
					<Card className="p-5 flex justify-center items-center">
						<Copy>
							<Show if={search} else="No tags are created">
								No results found
							</Show>
						</Copy>
					</Card>
				}
			>
				{tag => <TagCard key={tag.id} tag={tag} selected={selected} setSelected={setSelected} />}
			</For>
		</Grid>
	)
}

type Selected = string[] | null;

export interface TagsDisplayProps {
	tags: TagModel[];
	search: string;
	selected: Selected;
	setSelected: Dispatch<SetStateAction<Selected>>;
}
