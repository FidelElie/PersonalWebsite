import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
	Session,
	SupabaseClient,
	useSession,
	useSupabaseClient,
	SessionContextProvider
} from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";

import { useFetchCurrentUser } from "../api/client";
import type { FetchCurrentUserDTOType } from "../api/types";

const initialState: SupabaseContextType = { user: null, initialising: true, client: null }

const SupabaseContext = createContext<SupabaseContextType>(initialState);

export const SupabaseProvider = ({ client, initialSession, children }: SupabaseProviderProps) => (
	<SessionContextProvider supabaseClient={client} initialSession={initialSession}>
		<AuthProvider>
			{children}
		</AuthProvider>
	</SessionContextProvider>
)

const AuthProvider = (props: AuthProviderProps) => {
	const { children } = props;

	const queryClient = useQueryClient();
	const supabaseClient = useSupabaseClient()
	const session = useSession();

	const [initialising, setInitialising] = useState(true);

	const currentUserQuery = useFetchCurrentUser({
		onSettled: () => { setInitialising(false); }
	});

	useEffect(() => {
		queryClient.invalidateQueries(["user"]);
	}, [session]);

	return (
		<SupabaseContext.Provider value={{
			user: currentUserQuery.isSuccess ? currentUserQuery.data : null,
			initialising,
			client: supabaseClient
		}}>
			{children}
		</SupabaseContext.Provider>
	)
}

export const useSupabaseContext = () => {
	const context = useContext(SupabaseContext);

	if (!context) { throw new Error("useSupabaseContext hook must be used within QueryProvider"); }

	return context as ContextWithClient;
}

export type SupabaseContextType = {
	user: FetchCurrentUserDTOType | null,
	initialising: boolean,
	client: SupabaseClient | null
}

export type ContextWithClient = SupabaseContextType & { client: SupabaseClient }

interface SupabaseProviderProps {
	client: SupabaseClient,
	initialSession?: Session | null,
	children: ReactNode
}

export interface AuthProviderProps {
	children: ReactNode
}
