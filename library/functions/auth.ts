import { useMutation, useQuery } from "@tanstack/react-query";
import type { Provider } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const useGetCurrentUser = (
	{ onSettled }: { onSettled: () => void }
) => {
	return useQuery(
		["user"],
		async () => {
			const response = await fetch("/api/auth", { method: "GET" });

			if (response.status >= 400) { throw new Error(""); }

			if (response.status === 204) { return null; }

			const data = await response.json();

			return data;
		},
		{ onSettled, retry: false, staleTime: Infinity }
	)
}

export const useContinueWithPassword = () => {
	const supabase = useSupabaseClient();

	return useMutation(
		async (credentials: { email: string, password: string }) => {
			const { data, error } = await supabase.auth.signInWithPassword(credentials);

			if (error) { throw error; }

			return data;
		}
	);
}

export const useContinueWithMagicLink = () => {
	const supabase = useSupabaseClient();

	return useMutation(
		async (credentials: { email: string }) => {

			const { data, error } = await supabase.auth.signInWithOtp(credentials);

			if (error) { throw error; }

			return data;
		}
	);
}

export const useContinueWithSocialProvider = (provider: Provider) => {
	const supabase = useSupabaseClient();

	return useMutation(
		async () => {
			const { data, error } = await supabase.auth.signInWithOAuth({ provider });

			if (error) { throw error; }

			return data;
		}
	);
}

export const useLogout = () => {
	const supabase = useSupabaseClient();

	return useMutation(
		async () => {
			const { error } = await supabase.auth.signOut();

			if (error) { throw error; }

			return;
		}
	)
}
