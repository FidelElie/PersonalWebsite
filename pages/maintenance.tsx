import type { GetServerSideProps } from "next";

import type { ExtendedNextPage } from "@/library/types";

import { ServiceLayout } from "@/components/interfaces";

const MaintenancePage: ExtendedNextPage = () => {
	return (
		<ServiceLayout
			heading="Under Maintenance"
			description="The Website Will Be Back Up Soon."
		/>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	if (process.env.MAINTENANCE_MODE !== "1" && process.env.NODE_ENV !== "development") {
		return { redirect: { destination: "/", permanent: false } }
	}

	return { props: {} }
}

MaintenancePage.title = "Maintenance";

export default MaintenancePage;
