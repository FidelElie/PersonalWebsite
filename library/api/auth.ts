import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { useFirebaseAuth } from "../providers";

export const useLoginUser = (config: { onSuccess: () => void }) => {
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

export const useLogoutUser = (config: { onSuccess: () => void }) => {
	const auth = useFirebaseAuth();

	return useMutation(
		async () => { return await signOut(auth); },
		config
	)
}
