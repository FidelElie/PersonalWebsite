import { useState } from "react";

import { MergedModelSchema } from "@/configs/firebase";

import { useFetchSkills, useFetchTags } from "@/library/api";
import { SkillSchema } from "@/library/models";
import type { ExtendedNextPage } from "@/library/types";

import { Button, Flex, For, Icon, Copy } from "@/components/core";
import { DashboardLayout, QueryHandler } from "@/components/interfaces";
import { SkillsModal } from "@/components/pages/dashboard/skills/SkillsModal";
import { DeleteSkillsModal } from "@/components/pages/dashboard/skills/DeleteSkillsModal";

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
			title="Skills Dashboard | Fi Dev"
			headerTitle="Skills"
			headerOptions={(
				<Button onClick={() => setModal("skills")} className="flex items-center">
					<Icon name="add-circle-fill" className="text-white mr-1" />
					New Skill
				</Button>
			)}
		>
			<QueryHandler resource="skills" query={skillsQuery}>
				<Flex className="flex-col space-y-4">
					<For
						each={skillsQuery.data!}
						else={<Copy>No skills created</Copy>}
					>
						{
							skill => (
								<></>
							)
						}
					</For>
				</Flex>
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
