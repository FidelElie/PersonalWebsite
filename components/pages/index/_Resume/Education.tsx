import { MergedModelSchema } from "@/configs/firebase";

import { DetailSchema } from "@/library/models";

import { Box, Copy, Flex, For, Heading } from "@/components/core";

import { useResumeBuilder } from "../Resume.provider";

const narrowToEducation = (details: MergedModelSchema<DetailSchema>[]) => {
	return details.map(
		detail => detail.data.type === "education" ? { ...detail, data: detail.data } : []
	).flat();
}

export const Education = () => {
	const { selected: { details } } = useResumeBuilder();

	const educationPoints = narrowToEducation(details);

	educationPoints.sort(
		(a, b) => new Date(b.data.startDate).valueOf() - new Date(a.data.startDate).valueOf()
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
					{new Date(education.data.startDate).getFullYear()}
				</Copy.Inline>
				<Copy.Inline>&nbsp;-&nbsp;</Copy.Inline>
				<Copy.Inline className="text-secondary tracking-wide">
					{education.data.endDate ? new Date(education.data.endDate).getFullYear() : "Present"}
				</Copy.Inline>
			</Flex.Row>
		</Box>
	)
}

interface EducationEntryProps {
	education: ReturnType<typeof narrowToEducation>[number]
}
