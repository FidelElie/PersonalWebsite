import type { NextComponentType, NextPage, NextPageContext } from "next";

import type { UserSchema } from "../models";
import { AppProps } from "next/app";

export type ExtendedNextPage<Props = {}, InitialProps = Props> = NextPage<Props, InitialProps> & {
	auth: {
		redirectAuthenticated?: ((user: UserSchema) => string) | string;
		redirectUnauthenticated?: string
	}
}

export type ExtendedAppProps<P = any> = Omit<AppProps<P>, "Component"> & {
	Component: NextComponentType<NextPageContext, any, any> & ExtendedNextPage
}
