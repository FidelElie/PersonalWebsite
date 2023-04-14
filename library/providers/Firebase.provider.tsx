import { useState, createContext, useEffect, type ReactNode } from "react";
import type { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

const initialContext: FirebaseContextProps = { user: null, loading: true };
const FirebaseContext = createContext(initialContext);

export const FirebaseProvider = (props: FirebaseProviderProps) => {
	const { client, children } = props;
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(initialContext.loading);

	useEffect(() => {
		const auth = getAuth(client);

		return onAuthStateChanged(auth, async (user) => {
			try {
				if (user) {
					setUser(user);
				} else {
					setUser(null);
				}
			} catch (error) {
				// Connection error likely
			} finally {
				setLoading(false);
			}
		});
	}, [client]);

	return (
		<FirebaseContext.Provider value={{ user, loading }}>
			{ children }
		</FirebaseContext.Provider>
	)
}

export type FirebaseContextProps = {
	user: User | null;
	loading: boolean
}

export interface FirebaseProviderProps {
	client: FirebaseApp,
	children: ReactNode
}
