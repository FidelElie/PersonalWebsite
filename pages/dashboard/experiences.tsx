import type { ExtendedNextPage } from "@/library/types";

import { DashboardLayout } from "@/components/interfaces";

const DashboardExperiencesPage: ExtendedNextPage = () => {

	return (
		<DashboardLayout
			title="Experiences Dashboard | Fi Dev"
			headerTitle="Experiences"
		>

		</DashboardLayout>
	)
}

DashboardExperiencesPage.auth = {
	redirectUnauthenticated: "/login"
}
export default DashboardExperiencesPage;
