import { useState } from "react";

import type { MergedModelSchema } from "@/configs/firebase";

import { useFetchDetails } from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";
import type { DetailSchema } from "@/library/models";

import { Button, Icon } from "@/components/core";

import { QueryHandler } from "@/components/interfaces";

import { getDashboardProvider } from "@/components/pages/dashboard/DashboardProvider";
import { DashboardLayout } from "@/components/pages/dashboard/DashboardLayout";
import { DetailSections } from "@/components/pages/dashboard/details/DetailSections";
import { DetailsModal } from "@/components/pages/dashboard/details/DetailsModal";
import { DeleteDetailsModal } from "@/components/pages/dashboard/details/DeleteDetailsModal";

const DashboardDetailsPage: ExtendedNextPage = () => {
	const detailsQuery = useFetchDetails();

	const [modal, setModal] = useState<string | null>(null);
	const [selected, setSelected] = useState<MergedModelSchema<DetailSchema> | null>(null);

	const startEditing = (detail: MergedModelSchema<DetailSchema>) => {
		setSelected(detail);
		setModal("details")
	}

	const startDeletion = (detail: MergedModelSchema<DetailSchema>) => {
		setSelected(detail);
		setModal("delete-detail");
	}

	const closeModal = () => {
		setModal(null);
		setSelected(null);
	};

	return (
		<DashboardLayout
			headerTitle="Details"
			headerOptions={(
				<Button onClick={() => setModal("details")} className="flex items-center">
					<Icon name="add-circle-fill" className="text-white mr-1"/>
					New Detail
				</Button>
			)}
		>
			<QueryHandler resource="details" query={detailsQuery}>
				<DetailSections
					details={detailsQuery.data!}
					startEditing={startEditing}
					startDeletion={startDeletion}
				/>
				<DetailsModal
					isOpen={modal === "details"}
					detail={selected}
					onClose={closeModal}
				/>
				<DeleteDetailsModal
					isOpen={modal === "delete-detail" && !!selected}
					detail={selected!}
					onClose={closeModal}
				/>
			</QueryHandler>
		</DashboardLayout>
	)
}

DashboardDetailsPage.getLayout = getDashboardProvider;

DashboardDetailsPage.auth = {
	redirectUnauthenticated: "/login"
}
DashboardDetailsPage.title = "Details";

export default DashboardDetailsPage;
