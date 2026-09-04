import { useState } from "react";

import type { ExtendedNextPage } from "@/library/types";
import { useFetchTags } from "@/library/api";
import { useDebounce } from "@/library/hooks";

import { Button, Flex, Icon, Show, TextField } from "@/components/core";

import { getDashboardProvider } from "@/components/pages/dashboard/DashboardProvider";
import { CrudHelper } from "@/components/pages/dashboard/CrudHelper";
import { TagsDisplay } from "@/components/pages/dashboard/tags/TagsDisplay";
import { TagsDeletionModal } from "@/components/pages/dashboard/tags/TagsDeletionModal";

const DashboardTagsPage: ExtendedNextPage = () => {
	const tagsQuery = useFetchTags();

	const [modal, setModal] = useState<string | null>(null);
	const [selected, setSelected] = useState<string[] | null>(null);
	const [search, setSearch] = useState("");
	const [value, isDebouncing] = useDebounce(search);

	const openDeletionModal = () => setModal("delete-tags");

	const closeModal = () => setModal(null);

	return (
		<>
			<CrudHelper
				resource={tagsQuery}
				resourceName="Tags"
				header={(
					<Flex className="items-center space-x-2">
						<Show if={!selected || selected.length}>
							<TextField
								id="search"
								label="Tag Search"
								placeholder="Search"
								className="w-36 flex items-center space-x-1 px-2"
								inputClassName="h-8"
								value={search}
								onChange={setSearch}
								left={<Icon name="search-line" className="text-xl dark:text-white flex-shrink-0"/>}
								right={(
									<Show if={isDebouncing}>
										<Icon
											name="loader-4-line"
											className="animate-spin text-xl flex-shrink-0 dark:text-white"
										/>
									</Show>
								)}
							/>
						</Show>
						<Show if={!!(selected || []).length}>
							<Button onClick={openDeletionModal}>
								<Icon name="delete-bin-line" className="text-lg mr-2" />
								Bulk delete
							</Button>
						</Show>
						<Button
							onClick={() => setSelected(current => !current ? [] : null)}
							className="flex items-center"
						>
							<Show if={selected}>
								<Icon name="close-circle-line" className="text-lg mr-2" />
							</Show>
							{!selected ? "Edit" : `${selected.length} selected`}
						</Button>
					</Flex>
				)}
				display={({ resource }) => (
					<TagsDisplay
						tags={resource}
						search={value}
						selected={selected}
						setSelected={setSelected}
					/>
				)}
			/>
			<TagsDeletionModal
				isOpen={(selected || []).length && modal === "delete-tags"}
				onClose={closeModal}
				selected={selected || []}
				onSuccess={() => setSelected(null)}
			/>
		</>
	)
}

DashboardTagsPage.getLayout = getDashboardProvider;

DashboardTagsPage.auth = {
	redirectUnauthenticated: "/login"
}

DashboardTagsPage.title = "Tags";

export default DashboardTagsPage;
