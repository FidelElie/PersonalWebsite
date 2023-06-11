import { clc } from "@/library/utilities";

import { Copy, Flex, Icon } from "@/components/core";

export const PlaceholderBlock = (props: PlaceholderBlockProps) => {
	const { title } = props;

	return (
		<Flex.Column
			className={clc(
				"w-full h-36",
				"group items-center justify-center transition-all rounded-md text-tertiary border-2",
				"hover:border-primary"
			)}
		>
			<Icon name="add-circle-line" className="text-4xl mb-3 group-hover:text-primary" />
			<Copy className="group-hover:text-primary">Add {title}</Copy>
		</Flex.Column>
	)
}

export interface PlaceholderBlockProps {
	title: string;
}
