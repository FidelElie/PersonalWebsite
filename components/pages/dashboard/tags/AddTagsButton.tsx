import { useState } from "react";

import { Show, Icon, Flex } from "@/components/core";

import { TagInput } from "./TagInput";

export const AddTagsButton = () => {
	const [showInput, setShowInput] = useState(false);

	return (
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
				<TagInput onClose={() => setShowInput(false)}/>
			</Flex.Row>
		</Show>
	)
}
