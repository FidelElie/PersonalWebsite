import { useFetchDetails } from "@/library/api";
import type { ExtendedNextPage } from "@/library/types";

import { CrudHelper } from "@/components/pages/dashboard/CrudHelper";
import { getDashboardProvider } from "@/components/pages/dashboard/DashboardProvider";
import { DetailsDeletion } from "@/components/pages/dashboard/details/DetailsDeletion";
import { DetailsDisplay } from "@/components/pages/dashboard/details/DetailsDisplay";
import { DetailsEditor } from "@/components/pages/dashboard/details/DetailsEditor";

const DashboardDetailsPage: ExtendedNextPage = () => {
	const detailsQuery = useFetchDetails();

	return (
		<CrudHelper
			resource={detailsQuery}
			resourceName="Details"
			display={({ resource, update, delete: _delete }) => (
				<DetailsDisplay
					details={resource}
					update={update}
					delete={_delete}
				/>
			)}
			editor={({ selected, read }) => <DetailsEditor detail={selected} cancel={read}/> }
			deletions={({ selected, read }) => <DetailsDeletion detail={selected!} cancel={read}/>}
		/>
	)
}

DashboardDetailsPage.getLayout = getDashboardProvider;

DashboardDetailsPage.auth = {
	redirectUnauthenticated: "/login"
}
DashboardDetailsPage.title = "Details";

export default DashboardDetailsPage;
