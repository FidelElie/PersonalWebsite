import { MergedModelSchema } from "@/configs/firebase";

import { DetailSchema } from "@/library/models";

import { Box, Copy, Flex, For, Heading } from "@/components/core";

import { useResumeBuilder } from "../../Resume.provider";

const proficiencyPriority = {
	Native: 1,
	Fluent: 2,
	Basic: 3
}

const narrowToLanguage = (details: MergedModelSchema<DetailSchema>[]) => {
	return details.map(
		detail => detail.data.type === "language" ? { ...detail, data: detail.data } : []
	).flat();
}

export const LanguagesBlock = () => {
	const { selected: { details } } = useResumeBuilder();

	const languages = narrowToLanguage(details);

	languages.sort(
		(a, b) => proficiencyPriority[a.data.proficiency] - proficiencyPriority[b.data.proficiency]
	);

	return (
		<Flex.Column className="w-full space-y-1">
			<Heading.Two className="text-white uppercase">Languages</Heading.Two>
			<Flex.Column className="space-y-0.5">
				<For each={languages}>
					{language => <LanguageEntry key={language.id} language={language} />}
				</For>
			</Flex.Column>
		</Flex.Column>
	)
}

const LanguageEntry = (props: LanguageEntryProps) => {
	const { language } = props;

	return (
		<Box>
			<Copy className="text-white text-sm">
				{language.title}
			</Copy>
			<Copy className="text-secondary text-xs tracking-tighter">
				{language.data.proficiency}
			</Copy>

		</Box>
	)
}

interface LanguageEntryProps {
	language: ReturnType<typeof narrowToLanguage>[number]
}
