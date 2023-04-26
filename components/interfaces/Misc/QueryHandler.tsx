import { ReactNode } from "react";
import { UseQueryResult } from "@tanstack/react-query";

import { Copy, Show } from "@/components/core";

export const QueryHandler = <T extends any>(props: QueryHandlerProps<T>) => {
	const { resource, query, children } = props;

	const pluralisedResource = resource.endsWith("s") ? resource : `${resource}s`;

	// FIXME cheated here
	return (
		<>
			<Show if={query.isSuccess as any}>
				{ children }
			</Show>
			<Show if={query.isLoading}>
				<Copy>Loading {pluralisedResource}... Please Wait</Copy>
			</Show>
			<Show if={query.isLoading}>
				<Copy>Error fetching {pluralisedResource}</Copy>
			</Show>
		</>
	)
}

export interface QueryHandlerProps<T> {
	resource: string,
	query: UseQueryResult<T>,
	children: ReactNode | ((data: NonNullable<UseQueryResult<T>["data"]>) => ReactNode)
}
