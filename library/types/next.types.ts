import type { AppProps } from "next/app";
import type { NextApiRequest, NextComponentType, NextPage as BaseNextPage, NextPageContext } from "next";
import type { User } from "@supabase/supabase-js";

export type InitialPageProps = {
	auth?: {
		redirectOnSession?: true
	}
}

export type NextPage<P = {}> = BaseNextPage<P> & InitialPageProps;

export type PageAuthHandler = Omit<AppProps, "Component"> & {
	Component: NextComponentType<NextPageContext, any, any> & InitialPageProps
}

export type ExtendedNextApiRequest = NextApiRequest & {
	user?: null | User
}
