import { Dispatch, SetStateAction, useState } from "react";

import { TagModel } from "@/library/models";

import { clc } from "@/library/utilities";

import { Flex, Show, Heading, Icon, Box, Link } from "@/components/core";
import { TagInput } from "./TagInput";

export const TagCard = (props: TagCardProps) => {
	const { tag, selected = [], setSelected } = props;

	const [showInput, setShowInput] = useState(false);

	const toggleTagSelection = (tagId: string) => {
		setSelected(
			currentSelected => currentSelected?.some(id => tagId === id) ? currentSelected.filter(id => id !== tagId) : (currentSelected || []).concat([tagId])
		);
	}

	return (
		<Flex.Column
			className={
				clc(
					"group relative p-5 border items-center justify-center bg-white rounded",
					"dark:border-transparent dark:bg-gray-700",
					selected && "animate-wiggle"
				)
			}
		>
			<Show
				if={showInput}
				else={(
					<>
						<Show if={selected}>
							<input
								id="present"
								type="checkbox"
								checked={selected?.some(id => id === tag.id)}
								className="ml-2.5 p-2 rounded border-gray-300 dark:border-gray-100 absolute top-2.5 left-2.5"
								onChange={() => toggleTagSelection(tag.id)}
							/>
						</Show>
						<Box className="text-center">
							<Heading className="uppercase tracking-tighter" underline>
								{tag.name}
							</Heading>
							<Show if={tag.link}>
								<Link href={tag.link!} className="text-sm">{tag.link}</Link>
							</Show>
						</Box>
						<Flex.Row className="space-x-2 absolute top-2.5 right-2.5">
							<button
								className="opacity-100 h-min md:opacity-0 group-hover:opacity-100"
								onClick={() => setShowInput(true)}
							>
								<Icon name="edit-line" className="text-lg dark:text-white" />
							</button>
						</Flex.Row>
					</>
				)}
			>
				<TagInput tag={tag} onClose={() => setShowInput(false)}/>
			</Show>
		</Flex.Column>
	)
}

export interface TagCardProps {
	tag: TagModel;
	selected?: string[] | null;
	setSelected: Dispatch<SetStateAction<string[] | null>>;
}
