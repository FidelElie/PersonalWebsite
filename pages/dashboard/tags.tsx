import type { ExtendedNextPage } from "@/library/types";
import { useFetchTags } from "@/library/api";

import { Copy, For } from "@/components/core";
import { DashboardLayout, QueryHandler } from "@/components/interfaces";

const DashboardTagsPage: ExtendedNextPage = () => {
	const tagsQuery = useFetchTags();

	return (
		<DashboardLayout
			title="Projects Dashboard | Fi Dev"
			headerTitle="Tags"
		>
			<QueryHandler resource="tags" query={tagsQuery}>
				<For
					each={tagsQuery.data!}
					else={<Copy>No tags have been created</Copy>}
				>
					{ tags => (<></>)}
				</For>
			</QueryHandler>
		</DashboardLayout>
	)
}

DashboardTagsPage.auth = {
	redirectUnauthenticated: "/login"
}
export default DashboardTagsPage;
