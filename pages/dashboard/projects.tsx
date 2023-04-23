import type { ExtendedNextPage } from "@/library/types";
import { useFetchProjects } from "@/library/api";

import { DashboardLayout } from "@/components/interfaces";

const DashboardProjectsPage: ExtendedNextPage = () => {
	const projectsQuery = useFetchProjects();

	return (
		<DashboardLayout
			title="Projects Dashboard | Fi Dev"
			headerTitle="Projects"
		>

		</DashboardLayout>
	)
}

DashboardProjectsPage.auth = {
	redirectUnauthenticated: "/login"
}
export default DashboardProjectsPage;
