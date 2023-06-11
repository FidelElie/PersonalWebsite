import { DetailModel } from "@/library/models";

import { Box, Copy, Flex, For, Heading } from "@/components/core";

import { useResumeBuilder } from "../../ResumeBuilderProvider";

const narrowToActivities = (details: DetailModel[]) => {
	return details.map(
		detail => detail.data.type === "activity" ? { ...detail, data: detail.data } : []
	).flat()
}

export const ActivitiesBlock = () => {
	const { selected: { details } } = useResumeBuilder();

	const activities = narrowToActivities(details);

	return (
		<Flex.Column className="w-full space-y-1">
			<Heading.Two className="uppercase text-secondary" light>Activities</Heading.Two>
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
		<Box>
			<Copy className="text-white text-sm tracking-tighter">
				{activity.title}
			</Copy>
			<Box className="p-0.5 border border-secondary rounded w-min">
				<Copy className="text-secondary text-xs tracking-tighter whitespace-nowrap" light>
					{activity.data.detail}
				</Copy>
			</Box>
		</Box>
	)
}

interface InterestEntryProps {
	activity: ReturnType<typeof narrowToActivities>[number]
}
