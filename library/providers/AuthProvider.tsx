import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";

import type { UserSchema } from "../models";
import { useFirebaseAuth } from "./FirebaseProvider";

import { useFetchCurrentUser } from "../api";

const initialContext: AuthContextType = { user: null, loading: true }
const AuthContext = createContext(initialContext);

export const AuthProvider = (props: AuthProviderProps) => {
	const { children } = props;

	const auth = useFirebaseAuth();
	const queryClient = useQueryClient();
	const [initialLoad, setInitialLoad] = useState(false);
	const userQuery = useFetchCurrentUser({ enabled: initialLoad });

	useEffect(() => {
		return onAuthStateChanged(auth, () => {
			try {
				queryClient.invalidateQueries(["user"]);
			} catch (error) {
				console.log(error);
				// Connection error likely
			} finally {
				setInitialLoad(true);
			}
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user: userQuery.isSuccess ? userQuery.data : null,
				loading: !initialLoad || userQuery.isInitialLoading
			}}
		>
			{ children }
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext);

export type AuthContextType = {
	user: UserSchema | null;
	loading: boolean;
}

export interface AuthProviderProps { children: ReactNode; }
