import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
	Session,
	SupabaseClient,
	useSession,
	useSupabaseClient,
	SessionContextProvider
} from "@supabase/auth-helpers-react";
import type { users } from "@prisma/client";


import { useGetCurrentUser } from "../functions/auth";
import { useQueryClient } from "@tanstack/react-query";

const initialState: SupabaseContextType = {
	session: null,
	user: null,
	initialising: true,
	client: null
}

const SupabaseContext = createContext<SupabaseContextType>(initialState);

export const SupabaseProvider = ({ initialSession, children }: SupabaseProviderProps) => {
	const supabaseClient = useRef(createBrowserSupabaseClient()).current;

	return (
		<SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
			<AuthProvider>
				{ children }
			</AuthProvider>
		</SessionContextProvider>
	)
}

const AuthProvider = (props: AuthProviderProps) => {
	const { children } = props;

	const queryClient = useQueryClient();
	const supabaseClient = useSupabaseClient()
	const session = useSession();

	const [initialising, setInitialising] = useState(true);

	const currentUserQuery = useGetCurrentUser({
		onSettled: () => { setInitialising(false); }
	});

	useEffect(() => {
		supabaseClient.auth.onAuthStateChange(() => { queryClient.invalidateQueries(["user"]); });
	}, []);

	return (
		<SupabaseContext.Provider value={{
			session,
			initialising,
			user: currentUserQuery.isSuccess ? currentUserQuery.data : null,
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
	session: Session | null,
	user: users | null,
	initialising: boolean,
	client: SupabaseClient | null
}

export type ContextWithClient = SupabaseContextType & { client: SupabaseClient }

interface SupabaseProviderProps {
	initialSession?: Session | null,
	children: ReactNode
}

export interface AuthProviderProps {
	children: ReactNode
}
