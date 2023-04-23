import type { ExtendedNextPage } from "@/library/types";
import { useFetchTags } from "@/library/api";

import { DashboardLayout } from "@/components/interfaces";

const DashboardTagsPage: ExtendedNextPage = () => {
	const tagsQuery = useFetchTags();

	return (
		<DashboardLayout
			title="Projects Dashboard | Fi Dev"
			headerTitle="Tags"
		>

		</DashboardLayout>
	)
}

DashboardTagsPage.auth = {
	redirectUnauthenticated: "/login"
}
export default DashboardTagsPage;
