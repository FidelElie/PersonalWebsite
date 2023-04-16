import { useQuery } from "@tanstack/react-query";

import { User } from "../models";

export const useFetchCurrentUser = (
	id: string | null,
	config: { onSettled?: () => void, enabled: boolean }
) => {
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			if (!id) { return null; }

			return await User.findById(id);
 		},
		...config
	});
}
