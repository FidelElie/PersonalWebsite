import { DetailModel } from "@/library/models";

import { Box, Copy, Flex, For, Heading } from "@/components/core";

import { useResumeBuilder } from "../../ResumeBuilderProvider";

const proficiencyPriority = {
	Native: 1,
	Fluent: 2,
	Basic: 3
}

const narrowToLanguage = (details: DetailModel[]) => {
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
			<Heading.Two className="uppercase text-secondary" light>Languages</Heading.Two>
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
		<Flex.Row className="justify-between items-center">
			<Copy className="text-white text-sm">{language.title}</Copy>
			<Copy className="text-white text-xs tracking-tighter" light>
				{language.data.proficiency}
			</Copy>
		</Flex.Row>
	)
}

interface LanguageEntryProps {
	language: ReturnType<typeof narrowToLanguage>[number]
}

