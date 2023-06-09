import { toTimestamp } from "@/library/utilities";
import type { DetailModel } from "@/library/models";

import { Box, Copy, Flex, For, Heading, Show } from "@/components/core";

import { useResumeBuilder } from "../../ResumeProvider";

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
			<Heading.Two className="text-white uppercase">Education</Heading.Two>
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
		<Box className="tracking-tighter text-sm">
			<Copy className="text-white">
				{education.title}
			</Copy>
			<Copy className="text-white text-sm">
				{education.data.qualification}
			</Copy>
			<Copy className="text-white text-xs">
				{education.data.organisation}
			</Copy>
			<Flex.Row className="items-center text-xs text-secondary">
				<Copy.Inline className="text-secondary tracking-wide">
					{ toTimestamp(education.data.startDate).toDate().getFullYear()}
				</Copy.Inline>
				<Copy.Inline>&nbsp;-&nbsp;</Copy.Inline>
				<Copy.Inline className="text-secondary tracking-wide">
					<Show if={education.data.endDate} else="Present">
						{ endDate => toTimestamp(endDate).toDate().getFullYear() }
					</Show>
				</Copy.Inline>
			</Flex.Row>
		</Box>
	)
}

interface EducationEntryProps {
	education: ReturnType<typeof narrowToEducation>[number]
}
