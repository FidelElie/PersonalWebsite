import { useFetchSkills, useFetchTags } from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";


import { CrudHelper } from "@/components/pages/dashboard/CrudHelper";
import { getDashboardProvider } from "@/components/pages/dashboard/DashboardProvider";
import { SkillsDisplay } from "@/components/pages/dashboard/skills/SkillsDisplay";
import { SkillsEditor } from "@/components/pages/dashboard/skills/SkillsEditor";
import { SkillsDeletion } from "@/components/pages/dashboard/skills/SkillsDeletion";

const DashboardSkillsPage: ExtendedNextPage = () => {
	const skillsQuery = useFetchSkills();
	const tagsQuery = useFetchTags();

	return (
		<CrudHelper
			resource={skillsQuery}
			resourceName="Skills"
			dependents={{ tags: tagsQuery }}
			display={({ resource, dependents, update, delete: _delete }) => (
				<SkillsDisplay
					skills={resource}
					tags={dependents!.tags.data!}
					update={update}
					delete={_delete}
				/>
			)}
			editor={({ resource, dependents, selected, read }) => (
				<SkillsEditor
					skills={resource}
					tags={dependents!.tags.data!}
					skill={selected}
					cancel={read}
				/>
			)}
			deletions={({ selected, read }) => <SkillsDeletion skill={selected!} cancel={read} />}
		/>
	)
}

DashboardSkillsPage.getLayout = getDashboardProvider;

DashboardSkillsPage.auth = {
	redirectUnauthenticated: "/login"
}

DashboardSkillsPage.title = "Skills";

export default DashboardSkillsPage;
