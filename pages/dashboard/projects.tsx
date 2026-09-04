import { useFetchProjects, useFetchTags } from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";


import { CrudHelper } from "@/components/pages/dashboard/CrudHelper";
import { getDashboardProvider } from "@/components/pages/dashboard/DashboardProvider";
import { ProjectsDisplay } from "@/components/pages/dashboard/projects/ProjectsDisplay";
import { ProjectsEditor } from "@/components/pages/dashboard/projects/ProjectsEditor";
import { ProjectsDeletion } from "@/components/pages/dashboard/projects/ProjectsDeletion";

const DashboardProjectsPage: ExtendedNextPage = () => {
	const projectsQuery = useFetchProjects();
	const tagsQuery = useFetchTags();

	return (
		<CrudHelper
			resource={projectsQuery}
			resourceName="Projects"
			dependents={{ tags: tagsQuery }}
			display={({ resource, dependents, update, delete: _delete }) => (
				<ProjectsDisplay
					projects={resource}
					tags={dependents!.tags.data!}
					update={update}
					delete={_delete}
				/>
			)}
			editor={({ dependents, selected, read }) => (
				<ProjectsEditor
					tags={dependents!.tags.data!}
					project={selected}
					cancel={read}
				/>
			)}
			deletions={({ selected, read }) => <ProjectsDeletion project={selected!} cancel={read} />}
		/>
	)
}

DashboardProjectsPage.getLayout = getDashboardProvider;

DashboardProjectsPage.auth = {
	redirectUnauthenticated: "/login"
}

DashboardProjectsPage.title = "Projects";

export default DashboardProjectsPage;
