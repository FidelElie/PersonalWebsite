import { UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";

export const useQueryStatuses = (args: UseQueryResult[]) => {
	return useMemo(() => ({
		isSuccess: !args.map(request => request.isSuccess).includes(false),
		isFetched: !args.map(request => request.isFetched).includes(false),
		isError: args.some(request => request.isError),
		isLoading: args.some(request => request.isLoading)
	}), [args]);
}
