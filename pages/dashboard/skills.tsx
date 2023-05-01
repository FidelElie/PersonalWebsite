import { useState } from "react";

import { MergedModelSchema } from "@/configs/firebase";

import { useFetchSkills, useFetchTags } from "@/library/api";
import { SkillSchema } from "@/library/models";
import type { ExtendedNextPage } from "@/library/types";

import { Button, For, Icon, Copy, Grid } from "@/components/core";
import { DashboardLayout, QueryHandler } from "@/components/interfaces";
import { SkillsModal } from "@/components/pages/dashboard/skills/SkillsModal";
import { DeleteSkillsModal } from "@/components/pages/dashboard/skills/DeleteSkillsModal";
import { SkillCard } from "@/components/pages/dashboard/skills/SkillCard";

const DashboardSkillsPage: ExtendedNextPage = () => {
	const skillsQuery = useFetchSkills();
	const tagsQuery = useFetchTags();

	const [modal, setModal] = useState<string | null>(null);
	const [selected, setSelected] = useState<MergedModelSchema<SkillSchema> | null>(null);

	const startEditing = (detail: MergedModelSchema<SkillSchema>) => {
		setSelected(detail);
		setModal("skills")
	}

	const startDeletion = (detail: MergedModelSchema<SkillSchema>) => {
		setSelected(detail);
		setModal("delete-skills");
	}

	const closeModal = () => {
		setModal(null);
		setSelected(null);
	};

	return (
		<DashboardLayout
			title="Skills Dashboard"
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

DashboardSkillsPage.auth = {
	redirectUnauthenticated: "/login"
}
export default DashboardSkillsPage;
