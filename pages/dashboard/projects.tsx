import { useState } from "react";

import { MergedModelSchema } from "@/configs/firebase";

import { useFetchProjects } from "@/library/api";
import { ProjectSchema } from "@/library/models";
import type { ExtendedNextPage } from "@/library/types";

import { Button, Flex, For, Icon, Copy, Heading } from "@/components/core";
import { DashboardLayout, QueryHandler } from "@/components/interfaces";
import { ProjectsModal } from "@/components/pages/dashboard/projects/ProjectsModal";
import { DeleteProjectsModal } from "@/components/pages/dashboard/projects/DeleteProjectsModal";

const DashboardProjectsPage: ExtendedNextPage = () => {
	const projectsQuery = useFetchProjects();

	const [modal, setModal] = useState<string | null>(null);
	const [selected, setSelected] = useState<MergedModelSchema<ProjectSchema> | null>(null);

	const startEditing = (detail: MergedModelSchema<ProjectSchema>) => {
		setSelected(detail);
		setModal("projects")
	}

	const startDeletion = (detail: MergedModelSchema<ProjectSchema>) => {
		setSelected(detail);
		setModal("delete-project");
	}

	const closeModal = () => {
		setModal(null);
		setSelected(null);
	};

	return (
		<DashboardLayout
			title="Projects Dashboard | Fi Dev"
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
								<div
									key={project.id}
									className="group border bg-white dark:bg-gray-700 rounded px-3 py-2 dark:border-transparent"
								>
									<Flex.Row className="items-center justify-between mb-2">
										<Heading.Three className="text-xl" underline>{project.title}</Heading.Three>
										<Flex.Row className="items-center space-x-2">
											<button
												className="opacity-0 group-hover:opacity-100"
												onClick={() => startEditing(project)}
											>
												<Icon name="edit-line" className="text-lg dark:text-white" />
											</button>
											<button
												className="opacity-0 group-hover:opacity-100"
												onClick={() => startDeletion(project)}
											>
												<Icon name="delete-bin-line" className="text-lg dark:text-white" />
											</button>
										</Flex.Row>
									</Flex.Row>
									<Copy className="text-sm">{project.description}</Copy>
								</div>
							)
						}
					</For>
				</Flex>
				<ProjectsModal
					isOpen={modal === "projects"}
					project={selected}
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

DashboardProjectsPage.auth = {
	redirectUnauthenticated: "/login"
}
export default DashboardProjectsPage;
