import type { PageAuthHandler } from "@/library/types/next.types";
import { useSupabaseContext } from "@/library/providers";

import { Redirect, Icon } from "@/components/core";

const AuthComponent = ({ Component, pageProps }: PageAuthHandler) => {
	const { auth } = Component;

	const { session, initialising } = useSupabaseContext();

	if (initialising) { return <AuthInitialising />; }

	if (auth && auth.redirectOnSession && !!session) { return <Redirect href="/"/>; }

	return <Component {...pageProps} />;
}

const AuthInitialising = () => (
	<div className="flex w-screen h-screen items-center justify-center">
		<Icon name="loader-5" className="text-7xl animate-spin text-white"/>
	</div>
)

export default AuthComponent;
