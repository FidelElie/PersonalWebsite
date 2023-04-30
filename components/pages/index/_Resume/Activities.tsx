import { MergedModelSchema } from "@/configs/firebase";

import { DetailSchema } from "@/library/models";

import { Copy, Flex, For, Heading } from "@/components/core";

import { useResumeBuilder } from "../Resume.provider";

const narrowToActivities = (details: MergedModelSchema<DetailSchema>[]) => {
	return details.map(
		detail => detail.data.type === "activity" ? { ...detail, data: detail.data } : []
	).flat()
}

export const Activities = () => {
	const { selected: { details } } = useResumeBuilder();

	const activities = narrowToActivities(details);

	return (
		<Flex.Column className="w-full space-y-1">
			<Heading.Two className="text-white uppercase">Activities</Heading.Two>
			<Flex.Column className="space-y-0.5">
				<For each={activities}>
					{activity => <ActivityEntry key={activity.id} activity={activity} />}
				</For>
			</Flex.Column>
		</Flex.Column>
	)
}

const ActivityEntry = (props: InterestEntryProps) => {
	const { activity } = props;

	return (
		<Flex.Column>
			<Copy className="text-white text-sm tracking-tighter">
				{activity.title}
			</Copy>
			<Copy className="text-secondary text-xs">
				{activity.data.detail}
			</Copy>
		</Flex.Column>
	)
}

interface InterestEntryProps {
	activity: ReturnType<typeof narrowToActivities>[number]
}
