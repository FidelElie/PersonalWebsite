import { useState } from "react";

import type { MergedModelSchema } from "@/configs/firebase";

import { useFetchDetails } from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";
import type { DetailSchema } from "@/library/models";

import { Button, Icon, Show } from "@/components/core";
import { DashboardLayout } from "@/components/interfaces";

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
			title="Details Dashboard | Fi Dev"
			headerTitle="Details"
			headerOptions={(
				<Button onClick={() => setModal("details")} className="flex items-center">
					<Icon name="add-circle-fill" className="text-white mr-1"/>
					New Detail
				</Button>
			)}
		>
			<Show if={detailsQuery.isSuccess}>
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
			</Show>
			<Show if={detailsQuery.isLoading}>
				<span>Loading Details Please Wait</span>
			</Show>
			<Show if={detailsQuery.isError}>
				<span>Error fetching details</span>
			</Show>
		</DashboardLayout>
	)
}

DashboardDetailsPage.auth = {
	redirectUnauthenticated: "/login"
}

export default DashboardDetailsPage;
