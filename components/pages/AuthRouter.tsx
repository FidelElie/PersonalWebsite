import AppConfig from "@/environment/app.config";

import { useSupabaseContext } from "@/library/providers";
import type { PageAuthHandler } from "@/library/types/next.types";

import { Redirect, Icon, Flex, Text, Box, Link } from "@/components/core";
import { Rocket } from "@/components/interfaces";

const AuthComponent = ({ Component, pageProps }: PageAuthHandler) => {
	const { auth } = Component;

	const { user, initialising } = useSupabaseContext();

	if (initialising) { return <AuthInitialising />; }

	if (auth && auth.redirectWithSession && !!user) {
		return <Redirect href={generateRedirectionLink(auth.redirectWithSession)}/>;
	}

	if (auth && auth.redirectWithoutSession && !user) {
		return <Redirect href={generateRedirectionLink(auth.redirectWithoutSession)}/>;
	}

	return <Component {...pageProps} />;
}

const AuthInitialising = () => (
	<Flex className="flex-col h-screen items-center justify-center relative">
		<Rocket className="text-9xl animate-bounce"/>
		<Icon name="loader-5" className="text-2xl animate-spin text-gray dark:text-white"/>
		<Box className="absolute bottom-5 text-sm">
			<Text.Inline className="text-gray dark:text-white mr-1.5">Created by</Text.Inline>
			<Link href={AppConfig.socials.Github}>Fidel Elie</Link>
		</Box>
	</Flex>
)

const generateRedirectionLink = (redirection: true | string, fallback = "/") => {
	return typeof redirection === "string" ? redirection : fallback;
}

export default AuthComponent;
