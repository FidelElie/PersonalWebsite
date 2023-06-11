import { toTimestamp } from "@/library/utilities";
import type { DetailModel } from "@/library/models";

import { Box, Copy, Flex, For, Heading, Show } from "@/components/core";

import { useResumeBuilder } from "../../ResumeBuilderProvider";

const narrowToEducation = (details: DetailModel[]) => {
	return details.map(
		detail => detail.data.type === "education" ? { ...detail, data: detail.data } : []
	).flat();
}

export const EducationBlock = () => {
	const { selected: { details } } = useResumeBuilder();

	const educationPoints = narrowToEducation(details);

	educationPoints.sort(
		(a, b) => toTimestamp(b.data.startDate).toDate().valueOf() - toTimestamp(a.data.startDate).toDate().valueOf()
	);

	return (
		<Flex.Column className="w-full space-y-1">
			<Heading.Two className="uppercase text-secondary" light>Education</Heading.Two>
			<Flex.Column className="space-y-0.5">
				<For each={educationPoints}>
					{point => <EducationEntry key={point.id} education={point} />}
				</For>
			</Flex.Column>
		</Flex.Column>
	)
}

const EducationEntry = (props: EducationEntryProps) => {
	const { education } = props;

	return (
		<Box className="tracking-tighter text-sm space-y-0.5">
			<Flex.Row className="items-center justify-between">
				<Copy className="text-white">
					{education.title}
				</Copy>
				<Flex.Row className="items-center text-xs" >
					<Copy.Inline className="text-white tracking-wide" light>
						{toTimestamp(education.data.startDate).toDate().getFullYear()}
					</Copy.Inline>
					<Copy.Inline light>&nbsp;-&nbsp;</Copy.Inline>
					<Copy.Inline className="text-white tracking-wide" light>
						<Show if={education.data.endDate} else="Present">
							{endDate => toTimestamp(endDate).toDate().getFullYear()}
						</Show>
					</Copy.Inline>
				</Flex.Row>
			</Flex.Row>
			<Copy className="text-white text-xs">
				{education.data.qualification}
			</Copy>
			<Box className="p-0.5 border border-secondary rounded w-min">
				<Copy className="text-secondary text-xs whitespace-nowrap">
					{education.data.organisation}
				</Copy>
			</Box>
		</Box>
	)
}

interface EducationEntryProps {
	education: ReturnType<typeof narrowToEducation>[number]
}
