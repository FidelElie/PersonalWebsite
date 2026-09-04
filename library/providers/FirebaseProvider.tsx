import { createContext, type ReactNode, useContext } from "react";
import type { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export const FirebaseProvider = (props: FirebaseProviderProps) => {
	const { client, children } = props;

	return (
		<FirebaseContext.Provider value={{ client }}>
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

export type FirebaseContextProps = { client: FirebaseApp }

export interface FirebaseProviderProps {
	client: FirebaseApp,
	children: ReactNode
}
