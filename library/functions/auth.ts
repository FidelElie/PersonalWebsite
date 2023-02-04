import type { Provider } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

import supabase from "@/environment/supabase.client";

export const useContinueWithPassword = () => useMutation(
	async (credentials: { email: string, password: string }) => {
		const { data, error } = await supabase.auth.signInWithPassword(credentials);

		if (error) { throw error; }

		return data;
	}
);

export const useContinueWithMagicLink = () => useMutation(
	async (credentials: { email: string }) => {
		const { data, error } = await supabase.auth.signInWithOtp(credentials);

		if (error) { throw error; }

		return data;
	}
);

export const useContinueWithSocialProvider = (provider: Provider) => useMutation(
	async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({ provider });

		if (error) { throw error; }

		return data;
	}
);
