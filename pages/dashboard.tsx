import type { NextPage } from "@/library/types/next.types";

import { Page } from "@/components/core";
import { Sidebar } from "@/components/interfaces";

const DashboardPage: NextPage = () => {
	return (
		<Page
			title="Dashboard"
			aside={<Sidebar/>}
		>

		</Page>
	)
}

DashboardPage.auth = {
	redirectWithoutSession: true
}

export default DashboardPage;
