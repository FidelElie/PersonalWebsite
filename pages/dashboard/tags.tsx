import { useState } from "react";

import type { ExtendedNextPage } from "@/library/types";
import { useFetchTags } from "@/library/api";
import useDebounce from "@/library/hooks/useDebounce";

import { Button, Flex, For, Icon, Show, Grid, TextField, Card, Copy } from "@/components/core";
import { DashboardLayout, QueryHandler } from "@/components/interfaces";
import { AddTagsButton } from "@/components/pages/dashboard/tags/AddTagsButton";
import { TagCard } from "@/components/pages/dashboard/tags/TagCard";
import { DeleteTagsModal } from "@/components/pages/dashboard/tags/DeleteTagsModal";

const DashboardTagsPage: ExtendedNextPage = () => {
	const tagsQuery = useFetchTags();

	const [modal, setModal] = useState<string | null>(null);
	const [selected, setSelected] = useState<string[] | null>(null);
	const [search, setSearch] = useState("");
	const [value, isDebouncing] = useDebounce(search);

	const openDeletionModal = () => { setModal("delete-tags"); }

	const closeModal = () => { setModal(null); }

	return (
		<DashboardLayout
			title="Projects Dashboard"
			headerTitle="Tags"
			headerOptions={(
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
									<Icon name="loader-4-line" className="animate-spin text-xl flex-shrink-0"/>
								</Show>
							)}
						/>
					</Show>
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
				<Grid className="gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					<AddTagsButton/>
					<For
						each={!value ?
							tagsQuery.data! :
							tagsQuery.data!.filter(tag => tag.name.toLowerCase().includes(value.toLowerCase())
						)}
						else={
							<Card className="p-5 flex justify-center items-center">
								<Copy>
									<Show if={search} else="No tags are created">
										No results found
									</Show>
								</Copy>
							</Card>
						}
					>
						{tag => <TagCard key={tag.id} tag={tag} selected={selected} setSelected={setSelected}/>}
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
