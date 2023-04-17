import { useState } from "react";

import { useFetchDetails } from "@/library/api";
import { detailTypes } from "@/library/constants";
import type { ExtendedNextPage } from "@/library/types";

import { Show } from "@/components/core";
import { DashboardLayout } from "@/components/interfaces";

import { DetailSections } from "@/components/pages/dashboard/info/DetailSections";
import { DetailsModal } from "@/components/pages/dashboard/info/DetailsModal";

const DashboardInfoPage: ExtendedNextPage = () => {
	const detailsQuery = useFetchDetails();

	const [modal, setModal] = useState<string | null>(null);

	return (
		<div className="p-10">
			<Show if={detailsQuery.isSuccess}>
				<DetailSections
					details={detailsQuery.data!}
					openModal={(modal) => setModal(modal)}
				/>
				<DetailsModal
					isOpen={detailTypes.some(detail => detail === modal)}
					onClose={() => setModal(null)}
				/>
			</Show>
			<Show if={detailsQuery.isLoading}>
				<span>Loading Details Please Wait</span>
			</Show>
			<Show if={detailsQuery.isError}>
				<span>Error fetching details</span>
			</Show>
		</div>
	)
}

DashboardInfoPage.getLayout = (page) => (
	<DashboardLayout title="Dashboard | Fidel Elie">
		{page}
	</DashboardLayout>
)
DashboardInfoPage.auth = {
	redirectUnauthenticated: "/login"
}

export default DashboardInfoPage;
