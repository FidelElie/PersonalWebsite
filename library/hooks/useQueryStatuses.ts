import { useMemo } from "react";

import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

/** Merge react query mutations or queries statuses together */
export const useQueryStatuses = (
	args: (UseQueryResult<any, any> | UseMutationResult<any, any, any, any>)[]
) => {
	return useMemo(() => ({
		isSuccess: args.every(request => request.isSuccess),
		isFetched: !args.map(request => "isFetched" in request ? request.isFetched : false).includes(false),
		isError: args.some(request => request.isError),
		isLoading: args.some(request => request.isLoading)
	}), [args]);
}
