import type { ExtendedNextPage } from "@/library/types";

const DashboardPage: ExtendedNextPage = () => {
	return <></>;
}

DashboardPage.redirect = "/dashboard/projects";
DashboardPage.auth = {
	redirectUnauthenticated: "/login"
}

export default DashboardPage;
