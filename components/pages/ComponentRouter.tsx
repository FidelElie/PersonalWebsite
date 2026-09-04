import Head from "next/head";

import { AppConfig } from "@/configs/app.config";

import { useAuth } from "@/library/providers";
import type { ExtendedAppProps } from "@/library/types";

import { Redirect, Show } from "../core";

export const ComponentRouter = (props: ExtendedAppProps) => {
	const { pageProps, Component } = props;
	const { title } = Component;

	const { loading } = useAuth();

	return (
		<>
			<Show if={title}>
				<Head>
					<title>
						{`${typeof title === "function" ? title(pageProps) : title} | ${AppConfig.name}`}
					</title>
				</Head>
			</Show>
			<Show if={!loading}>
				<GuardedComponent {...props}/>
			</Show>
		</>
	);
}

const GuardedComponent = ({ Component, pageProps }: ExtendedAppProps) => {
	const { redirect, auth, getLayout } = Component;

	const { user } = useAuth();

	const passedLayout = getLayout ?? ((page) => page);

	if (redirect) { return <Redirect to={redirect} />; }

	if (auth && auth.redirectAuthenticated && user) {
		const to = typeof auth.redirectAuthenticated === "function" ? auth.redirectAuthenticated(user) : auth.redirectAuthenticated;

		return <Redirect to={to} />;
	}

	if (auth && auth.redirectUnauthenticated && !user) {
		return <Redirect to={auth.redirectUnauthenticated} />;
	}

	return (
		<>{passedLayout(<Component {...pageProps} />)}</>
	)
}
