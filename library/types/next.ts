import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextComponentType, NextPage, NextPageContext } from "next";

import type { UserSchema } from "../models";

export type ExtendedNextPage<Props = {}, InitialProps = Props> = NextPage<Props, InitialProps> & {
	redirect?: string,
	getLayout?: (page: ReactElement) => ReactNode,
	auth?: {
		redirectAuthenticated?: ((user: UserSchema) => string) | string;
		redirectUnauthenticated?: string
	},
	title?: string | ((props: Props) => string)
}

export type ExtendedAppProps<P = any> = Omit<AppProps<P>, "Component"> & {
	Component: NextComponentType<NextPageContext, any, any> & ExtendedNextPage
}
