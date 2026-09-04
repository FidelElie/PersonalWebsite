import { useFetchExperiences, useFetchTags } from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";

import { CrudHelper } from "@/components/pages/dashboard/CrudHelper";
import { getDashboardProvider } from "@/components/pages/dashboard/DashboardProvider";
import { ExperiencesDeletion } from "@/components/pages/dashboard/experiences/ExperiencesDeletion";
import { ExperiencesDisplay } from "@/components/pages/dashboard/experiences/ExperiencesDisplay";
import { ExperiencesEditor } from "@/components/pages/dashboard/experiences/ExperiencesEditor";

const DashboardExperiencesPage: ExtendedNextPage = () => {
	const experiencesQuery = useFetchExperiences();
	const tagsQuery = useFetchTags();

	return (
		<CrudHelper
			resource={experiencesQuery}
			resourceName="Experiences"
			dependents={{ tags: tagsQuery }}
			display={({ resource, dependents, update, delete: _delete }) => (
				<ExperiencesDisplay
					experiences={resource}
					tags={dependents!.tags.data!}
					update={update}
					delete={_delete}
				/>
			)}
			editor={({ dependents, selected, read }) => (
				<ExperiencesEditor
					tags={dependents!.tags.data!}
					experience={selected}
					cancel={read}
				/>
			)}
			deletions={({ selected, read }) => (
				<ExperiencesDeletion experience={selected!} cancel={read} />
			)}
		/>
	)
}

DashboardExperiencesPage.getLayout = getDashboardProvider;

DashboardExperiencesPage.auth = {
	redirectUnauthenticated: "/login"
}
DashboardExperiencesPage.title = "Experiences";

export default DashboardExperiencesPage;
