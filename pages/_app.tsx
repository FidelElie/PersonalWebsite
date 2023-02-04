import { useRef } from "react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/assets/styles";

import supabaseClient from "@/environment/supabase.client";

import { SupabaseProvider } from "@/library/providers";

const App = (props: AppProps) => {
	const { Component, pageProps } = props;
	const queryClient = useRef(new QueryClient()).current;

	return (
		<QueryClientProvider client={queryClient}>
			<SupabaseProvider client={supabaseClient} initialSession={pageProps.initialSession}>
				<Hydrate state={pageProps.dehydratedState}>
					<Component {...pageProps}/>
				</Hydrate>
			</SupabaseProvider>
		</QueryClientProvider>
	)
}

export default App;
