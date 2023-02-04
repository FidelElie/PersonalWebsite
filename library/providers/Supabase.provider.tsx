import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

const initialState: SupabaseContextType = { session: null, user: null, initialising: true }

const SupabaseContext = createContext<SupabaseContextType>(initialState);

const SupabaseProvider = (props: SupabaseProviderProps) => {
	const { client, initialSession, children } = props;

	const [state, setState] = useState({ ...initialState, session: initialSession || null });

	useEffect(() => {
		const setAuth = (session: Session | null, initialising?: boolean) => setState(
			currentState => ({
				...currentState,
				session,
				user: session ? session.user : null,
				initialising: initialising !== undefined ? initialising : currentState.initialising
			})
		);

		const checkForCurrentSession = async () => {
			const { data: { session } } = await client.auth.getSession();

			setAuth(session, false);
		}

		// Set the auth listener
		client.auth.onAuthStateChange((_event, session) => setAuth(session));

		checkForCurrentSession();
	}, []);

	useEffect(() => {
		if (initialSession) { setState(currentState => ({ ...currentState, initialising: false })); }
	}, [initialSession]);

	return (
		<SupabaseContext.Provider value={state}>
			{ children }
		</SupabaseContext.Provider>
	)
}

export const useSupabaseContext = () => useContext(SupabaseContext);

export type SupabaseContextType = {
	session: Session | null,
	user:	User | null,
	initialising: boolean
}

export interface SupabaseProviderProps {
	client: SupabaseClient,
	initialSession?: Session,
	children: ReactNode
}

export default SupabaseProvider;
