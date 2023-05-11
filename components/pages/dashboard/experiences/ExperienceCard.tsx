import { MergedModelSchema } from "@/configs/firebase";

import { ExperienceSchema, TagSchema } from "@/library/models";

import { Card, Flex, Heading, Icon, Copy, Show, Divider, Link } from "@/components/core";
import { TagsDisplay } from "@/components/interfaces";

export const ExperienceCard = (props: ExperienceCardProps) => {
	const { experience, tags = [], onEdit, onDelete } = props;

	return (
		<Card
			className="group border bg-white dark:bg-gray-700 rounded p-3 dark:border-transparent"
		>
			<Flex
				className="flex-col-reverse mb-2 md:items-center md:mb-0 md:justify-between md:flex-row"
			>
				<Flex.Column className="justify-start">
					<Heading.Three className="text-xl mb-1.5" underline>
						{experience.title}
					</Heading.Three>
					<Heading.Four className="font-light">
						{experience.organisation}
					</Heading.Four>
					<Flex.Row className="items-center text-sm">
						<Icon name="calendar-line" className="text-lg mr-2 dark:text-white" />
						<Copy.Inline>
							{experience.startDate.toLocaleDateString()}
						</Copy.Inline>
						<Copy.Inline>&nbsp;-&nbsp;</Copy.Inline>
						<Copy.Inline>
							{experience.endDate?.toLocaleDateString() ?? "Present"}
						</Copy.Inline>
					</Flex.Row>
				</Flex.Column>
				<Flex.Row className="space-x-2">
					<button
						className="opacity-100 h-min md:opacity-0 group-hover:opacity-100"
						onClick={() => onEdit(experience)}
					>
						<Icon name="edit-line" className="text-lg dark:text-white" />
					</button>
					<button
						className="opacity-100 h-min md:opacity-0 group-hover:opacity-100"
						onClick={() => onDelete(experience)}
					>
						<Icon name="delete-bin-line" className="text-lg dark:text-white" />
					</button>
				</Flex.Row>
			</Flex>
			<Show if={experience.link}>
				<Flex.Row className="items-center overflow-hidden">
					<Icon name="link" className="text-lg mr-2 flex-shrink-0 dark:text-white" />
					<Link className="text-sm text-ellipsis whitespace-nowrap" href={experience.link!}>
						{experience.link}
					</Link>
				</Flex.Row>
			</Show>
			<Show
				if={experience.tags.length}
				else={<Copy className="text-xs my-1 tracking-tight">No Tags added</Copy>}
			>
				<TagsDisplay tagIds={experience.tags} tags={tags} className="mt-2" />
			</Show>
			<Divider className="my-2" />
			<Copy className="text-sm">{experience.description}</Copy>
		</Card>
	)
}

type MergedExperienceSchema = MergedModelSchema<ExperienceSchema>;

export interface ExperienceCardProps {
	experience: MergedExperienceSchema;
	tags: MergedModelSchema<TagSchema>[];
	onEdit: (experience: MergedExperienceSchema) => void;
	onDelete: (experience: MergedExperienceSchema) => void;
}
