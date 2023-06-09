import { useState } from "react";

import { ExperienceModel } from "@/library/models";
import { useFetchExperiences, useFetchTags } from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";

import { Button, Flex, For, Icon, Copy } from "@/components/core";

import { QueryHandler } from "@/components/interfaces";

import { getDashboardProvider } from "@/components/pages/dashboard/DashboardProvider";
import { DashboardLayout } from "@/components/pages/dashboard/DashboardLayout";
import { ExperienceCard } from "@/components/pages/dashboard/experiences/ExperienceCard";
import { ExperiencesModal } from "@/components/pages/dashboard/experiences/ExperiencesModal";
import {
	DeleteExperiencesModal
} from "@/components/pages/dashboard/experiences/DeleteExperiencesModal";

const DashboardExperiencesPage: ExtendedNextPage = () => {
	const experiencesQuery = useFetchExperiences();
	const tagsQuery = useFetchTags();

	const [modal, setModal] = useState<string | null>(null);
	const [selected, setSelected] = useState<ExperienceModel | null>(null);

	const startEditing = (detail: ExperienceModel) => {
		setSelected(detail);
		setModal("experiences")
	}

	const startDeletion = (detail: ExperienceModel) => {
		setSelected(detail);
		setModal("delete-experience");
	}

	const closeModal = () => {
		setModal(null);
		setSelected(null);
	};

	return (
		<DashboardLayout
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

DashboardExperiencesPage.getLayout = getDashboardProvider;

DashboardExperiencesPage.auth = {
	redirectUnauthenticated: "/login"
}
DashboardExperiencesPage.title = "Experiences";

export default DashboardExperiencesPage;
