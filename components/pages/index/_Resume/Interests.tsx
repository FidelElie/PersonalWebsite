import { MergedModelSchema } from "@/configs/firebase";

import { DetailSchema } from "@/library/models";

import { Copy, Flex, For, Heading } from "@/components/core";

import { useResumeBuilder } from "../Resume.provider";

const narrowToInterests = (details: MergedModelSchema<DetailSchema>[]) => {
	return details.map(
		detail => detail.data.type === "interest" ? {...detail, data: detail.data } : []
	).flat();
}

export const Interests = () => {
	const { selected: { details } } = useResumeBuilder();

	const interests = narrowToInterests(details);

	return (
		<Flex.Column className="w-full space-y-1">
			<Heading.Two className="text-white uppercase">Interests</Heading.Two>
			<Flex.Column className="space-y-0.5">
				<For each={interests}>
					{ interest => <InterestEntry key={interest.id} interest={interest}/> }
				</For>
			</Flex.Column>
		</Flex.Column>
	)
}

const InterestEntry = (props: InterestEntryProps) => {
	const { interest } = props;

	return (
		<Flex.Column className="tracking-tighter">
			<Copy className="text-white text-sm">
				{interest.title}
			</Copy>
			<Copy className="text-secondary text-xs">
				{interest.data.detail}
			</Copy>
		</Flex.Column>
	)
}

interface InterestEntryProps {
	interest: ReturnType<typeof narrowToInterests>[number]
}