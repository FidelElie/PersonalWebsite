import { useState } from "react";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient } from "@tanstack/react-query";

import "./_app.css";

import { SupabaseProvider, QueryProvider, ThemeProvider } from "@/library/providers";

import AuthRouter from "@/components/pages/AuthRouter";

const App = (props: AppProps) => {
	const { pageProps } = props;

	const [queryClient] = useState(() => new QueryClient());
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	return (
		<QueryProvider client={queryClient} dehydratedState={pageProps.dehydratedState}>
			<SupabaseProvider client={supabaseClient} initialSession={pageProps.initialSession}>
				<ThemeProvider>
					<AuthRouter {...props}/>
				</ThemeProvider>
			</SupabaseProvider>
		</QueryProvider>
	)
}

export default App;
