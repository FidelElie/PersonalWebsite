import { useState } from "react";

import { MergedModelSchema } from "@/configs/firebase";

import { ExperienceSchema } from "@/library/models";
import { useFetchExperiences, useFetchTags } from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";

import { Button, Flex, For, Icon, Copy } from "@/components/core";
import { DashboardLayout, QueryHandler } from "@/components/interfaces";
import { ExperienceCard } from "@/components/pages/dashboard/experiences/ExperienceCard";
import { ExperiencesModal } from "@/components/pages/dashboard/experiences/ExperiencesModal";
import {
	DeleteExperiencesModal
} from "@/components/pages/dashboard/experiences/DeleteExperiencesModal";

const DashboardExperiencesPage: ExtendedNextPage = () => {
	const experiencesQuery = useFetchExperiences();
	const tagsQuery = useFetchTags();

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
			title="Experiences Dashboard"
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
								<ExperienceCard
									key={experience.id}
									experience={experience}
									tags={tagsQuery.isSuccess ? tagsQuery.data : []}
									onEdit={startEditing}
									onDelete={startDeletion}
								/>
							)
						}
					</For>
				</Flex>
				<ExperiencesModal
					isOpen={modal === "experiences"}
					experience={selected}
					tags={tagsQuery.isSuccess ? tagsQuery.data : []}
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
