import { useState } from "react";

import { MergedModelSchema } from "@/configs/firebase";

import { ExperienceSchema } from "@/library/models";
import { useFetchExperiences } from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";

import { Button, Flex, For, Icon, Copy, Heading, Link, Show, Divider } from "@/components/core";
import { DashboardLayout, QueryHandler } from "@/components/interfaces";
import { ExperiencesModal } from "@/components/pages/dashboard/experiences/ExperiencesModal";
import {
	DeleteExperiencesModal
} from "@/components/pages/dashboard/experiences/DeleteExperiencesModal";

const DashboardExperiencesPage: ExtendedNextPage = () => {
	const experiencesQuery = useFetchExperiences();

	const [modal, setModal] = useState<string | null>(null);
	const [selected, setSelected] = useState<MergedModelSchema<ExperienceSchema> | null>(null);

	const startEditing = (detail: MergedModelSchema<ExperienceSchema>) => {
		setSelected(detail);
		setModal("experiences")
	}

	const startDeletion = (detail: MergedModelSchema<ExperienceSchema>) => {
		setSelected(detail);
		setModal("delete-experience");
	}

	const closeModal = () => {
		setModal(null);
		setSelected(null);
	};

	return (
		<DashboardLayout
			title="Experiences Dashboard | Fi Dev"
			headerTitle="Experiences"
			headerOptions={(
				<Button onClick={() => setModal("experiences")} className="flex items-center">
					<Icon name="add-circle-fill" className="text-white mr-1" />
					New Experience
				</Button>
			)}
		>
			<QueryHandler resource="experiences" query={experiencesQuery}>
				<Flex className="flex-col space-y-4">
					<For
						each={experiencesQuery.data!}
						else={<Copy>No experiences created</Copy>}
					>
						{
							experience => (
								<div
									key={experience.id}
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
												<Icon name="calendar-line" className="text-lg mr-2 dark:text-white"/>
												<Copy.Inline>
													{experience.startDate.toLocaleDateString()}
												</Copy.Inline>
												<Copy.Inline>&nbsp;-&nbsp;</Copy.Inline>
												<Copy.Inline>
													{ experience.endDate?.toLocaleDateString() ?? "Present" }
												</Copy.Inline>
											</Flex.Row>
										</Flex.Column>
										<Flex.Row className="space-x-2">
											<button
												className="opacity-100 h-min md:opacity-0 group-hover:opacity-100"
												onClick={() => startEditing(experience)}
											>
												<Icon name="edit-line" className="text-lg dark:text-white" />
											</button>
											<button
												className="opacity-100 h-min md:opacity-0 group-hover:opacity-100"
												onClick={() => startDeletion(experience)}
											>
												<Icon name="delete-bin-line" className="text-lg dark:text-white" />
											</button>
										</Flex.Row>
									</Flex.Row>
									<Show if={experience.link}>
										<Link className="text-sm" href={experience.link!}>{experience.link}</Link>
									</Show>
									<Divider className="my-2"/>
									<Copy className="text-sm">{experience.description}</Copy>
								</div>
							)
						}
					</For>
				</Flex>
				<ExperiencesModal
					isOpen={modal === "experiences"}
					experience={selected}
					onClose={closeModal}
				/>
				<DeleteExperiencesModal
					isOpen={modal === "delete-experience"}
					experience={selected!}
					onClose={closeModal}
				/>
			</QueryHandler>
		</DashboardLayout>
	)
}

DashboardExperiencesPage.auth = {
	redirectUnauthenticated: "/login"
}
export default DashboardExperiencesPage;
