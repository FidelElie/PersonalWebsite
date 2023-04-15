import { useState, createContext, useEffect, type ReactNode, useContext } from "react";
import type { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export const FirebaseProvider = (props: FirebaseProviderProps) => {
	const { client, children } = props;
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

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
		<FirebaseContext.Provider value={{ user, loading, client }}>
			{ children }
		</FirebaseContext.Provider>
	)
}

export const useFirebaseContext = () => {
	const context = useContext(FirebaseContext);

	if (!context) { throw new Error("useFirebaseContext must be used within FirebaseProvider"); }

	return context;
};

export const useFirebaseAuth = () => {
	const { client } = useFirebaseContext();

	return getAuth(client);
}

export const useFirestore = () => {
	const { client } = useFirebaseContext();

	return getFirestore(client);
}

export const useFirebaseStorage = () => {
	const { client } = useFirebaseContext();

	return getStorage(client);
}

export type FirebaseContextProps = {
	user: User | null;
	loading: boolean,
	client: FirebaseApp
}

export interface FirebaseProviderProps {
	client: FirebaseApp,
	children: ReactNode
}
