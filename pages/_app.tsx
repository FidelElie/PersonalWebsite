import { useRef } from "react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient } from "@tanstack/react-query";

import "@/assets/styles.css";
import "remixicon/fonts/remixicon.css";

import supabaseClient from "@/environment/supabase.client";

import { SupabaseProvider, QueryProvider } from "@/library/providers";

import { AuthComponent } from "@/components/interfaces";

const App = (props: AppProps) => {
	const { pageProps } = props;
	const queryClient = useRef(new QueryClient()).current;

	return (
		<QueryProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<SupabaseProvider client={supabaseClient} initialSession={pageProps.initialSession}>
						<AuthComponent {...props}/>
					</SupabaseProvider>
				</Hydrate>
		</QueryProvider>
	)
}

export default App;
