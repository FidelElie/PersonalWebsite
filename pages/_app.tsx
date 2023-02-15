import type { AppProps } from "next/app";

import "./_app.css";

import { SupabaseProvider, QueryProvider, ThemeProvider } from "@/library/providers";

import AuthRouter from "@/components/pages/AuthRouter";

const App = (props: AppProps) => {
	const { pageProps } = props;

	return (
		<QueryProvider dehydratedState={pageProps.dehydratedState}>
			<SupabaseProvider initialSession={pageProps.initialSession}>
				<ThemeProvider>
					<AuthRouter {...props}/>
				</ThemeProvider>
			</SupabaseProvider>
		</QueryProvider>
	)
}

export default App;
