import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import type { UserSchema } from "../models";
import { useFirebaseAuth } from "./Firebase.provider";

import { useFetchCurrentUser } from "../api";

const initialContext: AuthContextType = { user: null, loading: true }
const AuthContext = createContext(initialContext);

export const AuthProvider = (props: AuthProviderProps) => {
	const { children } = props;
	const auth = useFirebaseAuth();
	const [initialLoad, setInitialLoad] = useState(false);
	const [uid, setUid] = useState<string | null>(null);
	const [loading, setLoading] = useState(initialContext.loading);

	const userQuery = useFetchCurrentUser(uid, {
		onSettled: () => setLoading(false),
		enabled: initialLoad
	});

	useEffect(() => {
		return onAuthStateChanged(auth, async (user) => {
			try {
				setUid(user ? user.uid : null);
			} catch (error) {
				console.log(error);
				// Connection error likely
			} finally {
				setInitialLoad(true);
			}
		})
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user: userQuery.isSuccess ? userQuery.data : null,
				loading
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
