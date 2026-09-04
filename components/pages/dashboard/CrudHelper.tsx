import { z } from "zod";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { UseQueryResult } from "@tanstack/react-query";

import { useQueryStatuses } from "@/library/hooks";

import { Copy, Show, Button, Icon, Flex  } from "@/components/core";
import { DashboardLayout } from "./DashboardLayout";

const QuerySchema = z.union([
	z.object({ action: z.literal("create"), id: z.undefined() }),
	z.object({ action: z.literal("read"), id: z.undefined() }),
	z.object({ action: z.literal("update"), id: z.string() }),
	z.object({ action: z.literal("delete"), id: z.string() }),
]).catch({ action: "read", id: undefined });

export const CrudHelper = <
	ResourceResult extends { id: string }[],
	Dependents extends { [key: string]: UseQueryResult }
>(
	props: CrudHelperProps<ResourceResult, Dependents>
) => {
	const {
		resource,
		resourceName,
		dependents,
		header,
		display,
		editor,
		deletions
	} = props;

	const router = useRouter();
	const { isLoading, isError, isSuccess } = useQueryStatuses(
		[resource, ...Object.values(dependents ?? {})]
	);

	const { action, id } = QuerySchema.parse(router.query);

	const pluralisedResource = resourceName.endsWith("s") ? resourceName : `${resourceName}s`;

	const selected = (resource.data || []).find(entry => entry.id === id);

	const create = () => router.push(`${router.pathname}?action=create`);
	const read = () => router.push(`${router.pathname}`);
	const update = (id: string) => router.push(`${router.pathname}?action=update&id=${id}`);
	const _delete = (id: string) => router.push(`${router.pathname}?action=delete&id=${id}`);

	const params = {
		resource: resource.data!,
		selected,
		dependents,
		create,
		read,
		update,
		delete: _delete
	}

	return (
		<DashboardLayout
			headerTitle={pluralisedResource}
			headerOptions={(
				<Flex className="space-x-2">
					{ header }
					<Show if={action !== "create"}>
						<Button onClick={create} className="flex items-center">
							<Icon name="add-circle-fill" className="text-white mr-1" />
							New {pluralisedResource}
						</Button>
					</Show>
				</Flex>
			)}
		>
			<Show if={isSuccess}>
				<Show if={(action === "read" && display) ? display : null}>
					{ displayFunc =>  displayFunc(params) }
				</Show>
				<Show if={((action === "create" || action === "update") && editor) ? editor : null }>
					{ editorFunc => editorFunc(params) }
				</Show>
				<Show if={(action === "delete" && deletions) ? deletions : null}>
					{ deleteFunc =>  deleteFunc(params) }
				</Show>
			</Show>
			<Show if={isLoading}>
				<Copy>Loading {pluralisedResource}... Please Wait</Copy>
			</Show>
			<Show if={isError}>
				<Copy>Error fetching {pluralisedResource}</Copy>
			</Show>
		</DashboardLayout>
	)
}

type Pass<
	ResourceResult extends { id: string }[],
	Dependents extends { [key: string]: UseQueryResult }
> = {
	resource: ResourceResult,
	selected?: ResourceResult[number],
	create: () => void;
	read: () => void;
	update: (id: string) => void;
	delete: (id: string) => void;
	dependents?: Dependents;
}

interface CrudHelperProps<
	ResourceResult extends { id: string }[],
	Dependents extends { [key: string]: UseQueryResult }
> {
	resource: UseQueryResult<ResourceResult>,
	resourceName: string,
	dependents?: Dependents;
	header?: ReactNode;
	display?: (params: Pass<ResourceResult, Dependents>) => ReactNode;
	editor?: (params: Pass<ResourceResult, Dependents>) => ReactNode;
	deletions?: (params: Pass<ResourceResult, Dependents>) => ReactNode;
}
