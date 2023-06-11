import { DetailModel } from "@/library/models";

import { Copy, Flex, For, Heading } from "@/components/core";

import { useResumeBuilder } from "../../ResumeBuilderProvider";

const narrowToInterests = (details: DetailModel[]) => {
	return details.map(
		detail => detail.data.type === "interest" ? {...detail, data: detail.data } : []
	).flat();
}

export const InterestsBlock = () => {
	const { selected: { details } } = useResumeBuilder();

	const interests = narrowToInterests(details);

	return (
		<Flex.Column className="w-full space-y-1">
			<Heading.Two className="uppercase text-secondary" light>Interests</Heading.Two>
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
			<Flex.Row className="flex-wrap gap-x-1.5 my-1 line-clamp-2">
				<For each={interest.data.detail.split(",")}>
					{(detail, detailIndex) => (
						<Flex className="p-0.5 border border-secondary rounded" key={detailIndex}>
							<Copy className="text-xs text-secondary" light>{detail}</Copy>
						</Flex>
					)}
				</For>
			</Flex.Row>
		</Flex.Column>
	)
}

interface InterestEntryProps {
	interest: ReturnType<typeof narrowToInterests>[number]
}
