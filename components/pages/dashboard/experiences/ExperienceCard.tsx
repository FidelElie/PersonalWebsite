import { MergedModelSchema } from "@/configs/firebase";

import { ExperienceSchema, TagSchema } from "@/library/models";

import { Card, Flex, Heading, Icon, Copy, Show, Divider, Link } from "@/components/core";
import { TagsDisplay } from "@/components/interfaces";

export const ExperienceCard = (props: ExperienceCardProps) => {
	const { experience, tags = [], onEdit, onDelete } = props;

	return (
		<Card
			className="group border bg-white dark:bg-gray-700 rounded px-3 py-2 dark:border-transparent"
		>
			<Flex.Row className="justify-between">
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
			</Flex.Row>
			<Show if={experience.link}>
				<Link className="text-sm" href={experience.link!}>{experience.link}</Link>
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
