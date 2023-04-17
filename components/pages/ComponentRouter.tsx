import { useAuth } from "@/library/providers";
import type { ExtendedAppProps } from "@/library/types";

import { Redirect } from "../core";

export const ComponentRouter = ({ Component, pageProps }: ExtendedAppProps) => {
	const { redirect, auth, getLayout } = Component;
	const passedLayout = getLayout ?? ((page) => page);

	const { user, loading } = useAuth();

	if (loading) { return null; }

	if (redirect) { return <Redirect to={redirect}/>; }

	if (auth && auth.redirectAuthenticated && user) {
		const to = typeof auth.redirectAuthenticated === "function" ? auth.redirectAuthenticated(user) : auth.redirectAuthenticated;

		return <Redirect to={to} />;
	}

	if (auth && auth.redirectUnauthenticated && !user) {
		return <Redirect to={auth.redirectUnauthenticated} />;
	}

	return <>{passedLayout(<Component {...pageProps} />)}</>;
}
