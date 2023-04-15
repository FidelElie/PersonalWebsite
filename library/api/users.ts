import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";

import { useFirestore } from "../providers";
import { User } from "../models";

export const useFetchCurrentUser = (
	id: string | null,
	config: { onSettled?: () => void, enabled: boolean }
) => {
	const firestore = useFirestore();

	return useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			if (!id) { return null; }

 			const snapshot = await getDoc(doc(firestore, "users", id));

			return snapshot.exists() ? User.parse(snapshot.data()) : null;
 		},
		...config
	});
}
