import { useState } from "react";

import { useFetchSkills, useFetchTags } from "@/library/api";
import { SkillModel } from "@/library/models";
import type { ExtendedNextPage } from "@/library/types";

import { Button, For, Icon, Copy, Grid } from "@/components/core";

import { QueryHandler } from "@/components/interfaces";

import { getDashboardProvider } from "@/components/pages/dashboard/DashboardProvider";
import { DashboardLayout } from "@/components/pages/dashboard/DashboardLayout";
import { SkillsModal } from "@/components/pages/dashboard/skills/SkillsModal";
import { DeleteSkillsModal } from "@/components/pages/dashboard/skills/DeleteSkillsModal";
import { SkillCard } from "@/components/pages/dashboard/skills/SkillCard";

const DashboardSkillsPage: ExtendedNextPage = () => {
	const skillsQuery = useFetchSkills();
	const tagsQuery = useFetchTags();

	const [modal, setModal] = useState<string | null>(null);
	const [selected, setSelected] = useState<SkillModel | null>(null);

	const startEditing = (skill: SkillModel) => {
		setSelected(skill);
		setModal("skills")
	}

	const startDeletion = (skill: SkillModel) => {
		setSelected(skill);
		setModal("delete-skills");
	}

	const closeModal = () => {
		setModal(null);
		setSelected(null);
	};

	return (
		<DashboardLayout
			headerTitle="Skills"
			headerOptions={(
				<Button onClick={() => setModal("skills")} className="flex items-center">
					<Icon name="add-circle-fill" className="text-white mr-1" />
					New Skill
				</Button>
			)}
		>
			<QueryHandler resource="skills" query={skillsQuery}>
				<Grid className="gap-3 grid-cols-1 md:grid-cols-2">
					<For
						each={skillsQuery.data!}
						else={<Copy>No skills created</Copy>}
					>
						{
							skill => (
								<SkillCard
									key={skill.id}
									skill={skill}
									tags={tagsQuery.isSuccess ? tagsQuery.data : []}
									onEdit={startEditing}
									onDelete={startDeletion}
								/>
							)
						}
					</For>
				</Grid>
				<SkillsModal
					isOpen={modal === "skills"}
					skill={selected}
					skills={skillsQuery.data!}
					tags={tagsQuery.isSuccess ? tagsQuery.data : []}
					onClose={closeModal}
				/>
				<DeleteSkillsModal
					isOpen={modal === "delete-skill"}
					skill={selected!}
					onClose={closeModal}
				/>
			</QueryHandler>
		</DashboardLayout>
	)
}

DashboardSkillsPage.getLayout = getDashboardProvider;

DashboardSkillsPage.auth = {
	redirectUnauthenticated: "/login"
}

DashboardSkillsPage.title = "Skills";

export default DashboardSkillsPage;
