import type { ExtendedNextPage } from "@/library/types";

import { DashboardLayout } from "@/components/interfaces";

const DashboardPage: ExtendedNextPage = () => {
	return <></>;
}

DashboardPage.redirect = "/dashboard/projects";
DashboardPage.getLayout = (page) => (
	<DashboardLayout title="Dashboard | Fidel Elie">
		{page}
	</DashboardLayout>
)
DashboardPage.auth = {
	redirectUnauthenticated: "/login"
}

export default DashboardPage;
