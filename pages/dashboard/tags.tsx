import { useState } from "react";

import type { ExtendedNextPage } from "@/library/types";
import { useFetchTags } from "@/library/api";

import { Button, Flex, For, Icon, Show, Grid } from "@/components/core";
import { DashboardLayout, QueryHandler } from "@/components/interfaces";
import { AddTagsButton } from "@/components/pages/dashboard/tags/AddTagsButton";
import { TagCard } from "@/components/pages/dashboard/tags/TagCard";
import { DeleteTagsModal } from "@/components/pages/dashboard/tags/DeleteTagsModal";

const DashboardTagsPage: ExtendedNextPage = () => {
	const tagsQuery = useFetchTags();

	const [modal, setModal] = useState<string | null>(null);
	const [selected, setSelected] = useState<string[] | null>(null);

	const openDeletionModal = () => { setModal("delete-tags"); }

	const closeModal = () => { setModal(null); }

	return (
		<DashboardLayout
			title="Projects Dashboard | Fi Dev"
			headerTitle="Tags"
			headerOptions={(
				<Flex className="items-center space-x-2">
					<Show if={!!(selected || []).length}>
						<Button onClick={openDeletionModal}>
							<Icon name="delete-bin-line" className="text-lg mr-2"/>
							Bulk delete
						</Button>
					</Show>
					<Button
						onClick={() => setSelected(current => !current ? [] : null)}
						className="flex items-center"
					>
						<Show if={selected}>
							<Icon name="close-circle-line" className="text-lg mr-2"/>
						</Show>
						{!selected ? "Edit" : `${selected.length} selected`}
					</Button>
				</Flex>
			)}
		>
			<QueryHandler resource="tags" query={tagsQuery}>
				<Grid className="gap-3 grid-cols-1 md:gird-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					<AddTagsButton/>
					<For each={tagsQuery.data!}>
						{ tag => (
							<TagCard key={tag.id} tag={tag} selected={selected} setSelected={setSelected} />
						)}
					</For>
				</Grid>
				<DeleteTagsModal
					isOpen={(selected || []).length && modal === "delete-tags"}
					onClose={closeModal}
					selected={(selected || [])}
					onSuccess={() => setSelected(null)}
				/>
			</QueryHandler>
		</DashboardLayout>
	)
}

DashboardTagsPage.auth = {
	redirectUnauthenticated: "/login"
}
export default DashboardTagsPage;
