import { useMutation, useQuery } from "@tanstack/react-query";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { useFirebaseAuth } from "../providers";
import { User } from "../models";

export const useFetchCurrentUser = (config: { enabled: boolean }) => {
	const auth = useFirebaseAuth();

	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const user = auth.currentUser;

			if (!user) { return null; }

			return await User.findById(user.uid);
		},
		...config
	});
}

export const useLoginUser = (config?: { onSuccess?: () => void }) => {
	const auth = useFirebaseAuth();

	return useMutation(
		async (credentials: { email: string, password: string }) => {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password
			);

			return userCredential;
		},
		config
	);
}

export const useLogoutUser = (config?: { onSuccess?: () => void }) => {
	const auth = useFirebaseAuth();

	return useMutation(
		async () => { return await signOut(auth); },
		config
	)
}
