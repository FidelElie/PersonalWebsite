import { useState } from "react";

import { useFetchProjects, useFetchTags } from "@/library/api";
import { ProjectModel } from "@/library/models";
import type { ExtendedNextPage } from "@/library/types";

import { Button, Flex, For, Icon, Copy } from "@/components/core";

import { QueryHandler } from "@/components/interfaces";

import { getDashboardProvider } from "@/components/pages/dashboard/DashboardProvider";
import { DashboardLayout } from "@/components/pages/dashboard/DashboardLayout";
import { ProjectCard } from "@/components/pages/dashboard/projects/ProjectCard";
import { ProjectsModal } from "@/components/pages/dashboard/projects/ProjectsModal";
import { DeleteProjectsModal } from "@/components/pages/dashboard/projects/DeleteProjectsModal";

const DashboardProjectsPage: ExtendedNextPage = () => {
	const projectsQuery = useFetchProjects();
	const tagsQuery = useFetchTags();

	const [modal, setModal] = useState<string | null>(null);
	const [selected, setSelected] = useState<ProjectModel | null>(null);

	const startEditing = (project: ProjectModel) => {
		setSelected(project);
		setModal("projects")
	}

	const startDeletion = (project: ProjectModel) => {
		setSelected(project);
		setModal("delete-project");
	}

	const closeModal = () => {
		setModal(null);
		setSelected(null);
	};

	return (
		<DashboardLayout
			headerTitle="Projects"
			headerOptions={(
				<Button onClick={() => setModal("projects")} className="flex items-center">
					<Icon name="add-circle-fill" className="text-white mr-1" />
					New Project
				</Button>
			)}
		>
			<QueryHandler resource="projects" query={projectsQuery}>
				<Flex className="flex-col space-y-4">
					<For
						each={projectsQuery.data!}
						else={<Copy>No projects created</Copy>}
					>
						{
							project => (
								<ProjectCard
									key={project.id}
									project={project}
									tags={tagsQuery.isSuccess ? tagsQuery.data : []}
									onEdit={startEditing}
									onDelete={startDeletion}
								/>
							)
						}
					</For>
				</Flex>
				<ProjectsModal
					isOpen={modal === "projects"}
					project={selected}
					tags={tagsQuery.isSuccess ? tagsQuery.data : []}
					onClose={closeModal}
				/>
				<DeleteProjectsModal
					isOpen={modal === "delete-project"}
					project={selected!}
					onClose={closeModal}
				/>
			</QueryHandler>
		</DashboardLayout>
	)
}

DashboardProjectsPage.getLayout = getDashboardProvider;

DashboardProjectsPage.auth = {
	redirectUnauthenticated: "/login"
}

DashboardProjectsPage.title = "Projects";

export default DashboardProjectsPage;
