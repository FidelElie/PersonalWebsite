import { DetailModel } from "@/library/models";

import { Box, Copy, Flex, For, Heading } from "@/components/core";

import { useResumeBuilder } from "../../ResumeBuilderProvider";
import { SidebarTag } from "@/components/interfaces";

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
			<Copy className="text-white text-sm tracking-tighter mb-1">
				{activity.title}
			</Copy>
			<SidebarTag>{activity.data.detail}</SidebarTag>
		</Box>
	)
}

interface InterestEntryProps {
	activity: ReturnType<typeof narrowToActivities>[number]
}
