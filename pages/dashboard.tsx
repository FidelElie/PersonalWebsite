import type { NextPage } from "@/library/types/next.types";

import { Page } from "@/components/core";
import { Navbar } from "@/components/interfaces";

const DashboardPage: NextPage = () => {
	return (
		<Page
			title="Dashboard"
			header={<Navbar/>}
		>

		</Page>
	)
}

DashboardPage.auth = {
	redirectWithoutSession: true
}

export default DashboardPage;
