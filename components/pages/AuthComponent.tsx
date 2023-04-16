import { useAuth } from "@/library/providers";
import type { ExtendedAppProps } from "@/library/types";

import { Redirect } from "../core";

export const AuthComponent = ({ Component, pageProps }: ExtendedAppProps) => {
	const { auth } = Component;

	const { user, loading } = useAuth();

	if (loading) { return null; }

	if (auth && auth.redirectAuthenticated && user) {
		const to = typeof auth.redirectAuthenticated === "function" ? auth.redirectAuthenticated(user) : auth.redirectAuthenticated;

		return <Redirect to={to} />;
	}

	if (auth && auth.redirectUnauthenticated && !user) {
		return <Redirect to={auth.redirectUnauthenticated} />;
	}

	return <Component {...pageProps} />
}
