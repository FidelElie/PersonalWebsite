import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useFirebaseAuth } from "../providers";

export const useLoginUser = () => {
	const auth = useFirebaseAuth();

	return useMutation(
		async (credentials: { email: string, password: string }) => {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password
			);

			return userCredential;
		}
	);
}
