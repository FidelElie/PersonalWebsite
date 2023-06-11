import { useQueryClient } from "@tanstack/react-query";

import { ExperienceModel, TagModel } from "@/library/models"
import { useEditExperienceById } from "@/library/api";
import { clc, toTimestamp } from "@/library/utilities";

import {
	Card,
	Copy,
	Divider,
	Flex,
	For,
	Heading,
	Icon,
	Link,
	Show,
	Toggle
} from "@/components/core";
import { TagsDisplay } from "@/components/interfaces";
import { InformationDisplay } from "../InformationDisplay";

export const ExperiencesDisplay = (props: ExperiencesDisplayProps) => {
	const { experiences, tags, update, delete: _delete } = props;

	return (
		<Flex className="flex-col space-y-4">
			<For
				each={experiences!}
				else={<Copy>No experiences created</Copy>}
			>
				{
					experience => (
						<ExperienceCard
							key={experience.id}
							experience={experience}
							tags={tags}
							update={update}
							delete={_delete}
						/>
					)
				}
			</For>
		</Flex>
	)
}


const ExperienceCard = (props: ExperienceCardProps) => {
	const { experience, tags = [], update, delete: _delete } = props;

	const queryClient = useQueryClient();
	const editExperience = useEditExperienceById();

	const handleActiveToggle = async (checked: boolean) => {
		await editExperience.mutateAsync({ id: experience.id, experience: { active: checked } });
		queryClient.invalidateQueries(["experiences"]);
	}

	return (
		<Card
			className={clc(
				"group border bg-white rounded p-3",
				"dark:border-transparent dark:bg-gray-700",
				!experience.active && "opacity-50"
			)}
		>
			<Flex
				className="flex-col-reverse mb-2 md:items-center md:mb-0 md:justify-between md:flex-row"
			>
				<Heading.Three className="text-xl mb-1.5" underline>
					{experience.title}
				</Heading.Three>
				<Flex.Row className="items-center space-x-2">
					<button
						className="opacity-100 h-min md:opacity-0 group-hover:opacity-100"
						onClick={() => update(experience.id)}
					>
						<Icon name="edit-line" className="text-lg dark:text-white" />
					</button>
					<button
						className="opacity-100 h-min md:opacity-0 group-hover:opacity-100"
						onClick={() => _delete(experience.id)}
					>
						<Icon name="delete-bin-line" className="text-lg dark:text-white" />
					</button>
					<Toggle
						label="Active"
						className="h-6 w-10"
						checked={experience.active}
						onChange={handleActiveToggle}
					/>
				</Flex.Row>
			</Flex>
			<Flex.Column className="justify-start">
				<Heading.Four className="font-light">
					{experience.organisation}
				</Heading.Four>
				<Flex.Row className="items-center text-sm">
					<Icon name="calendar-line" className="text-lg mr-2 dark:text-white" />
					<Copy.Inline>
						{toTimestamp(experience.startDate).toDate().toLocaleDateString()}
					</Copy.Inline>
					<Copy.Inline>&nbsp;-&nbsp;</Copy.Inline>
					<Copy.Inline>
						<Show if={experience.endDate} else="Present">
							{endDate => toTimestamp(endDate).toDate().toLocaleDateString()}
						</Show>
					</Copy.Inline>
				</Flex.Row>
			</Flex.Column>
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
			<InformationDisplay points={experience.points} description={experience.description}/>
		</Card>
	)
}

type SharedProps = {
	tags: TagModel[];
	update: (id: string) => void;
	delete: (id: string) => void;
}

export interface ExperienceCardProps extends SharedProps { experience: ExperienceModel; }


export interface ExperiencesDisplayProps extends SharedProps { experiences: ExperienceModel[]; }
