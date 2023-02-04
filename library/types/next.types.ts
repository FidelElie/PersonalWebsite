import type { AppProps } from "next/app";
import type { NextComponentType, NextPage as BaseNextPage, NextPageContext } from "next";

export type InitialPageProps = {
	auth?: {
		redirectOnSession?: true
	}
}

export type NextPage<P = {}> = BaseNextPage<P> & InitialPageProps;

export type PageAuthHandler = Omit<AppProps, "Component"> & {
	Component: NextComponentType<NextPageContext, any, any> & InitialPageProps
}
