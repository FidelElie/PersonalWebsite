import type { ReactNode } from "react";
import Head from "next/head";

import { joinClasses } from "@/library/utilities";

export const Page = (props: PageProps) => {
	const {
		header,
		aside,
		footer,
		headerClassName,
		asideClassName,
		mainClassName,
		title = "Home",
		description,
		index,
		follow,
		keywords,
		children
	} = props;

	const pageTitle = `${title} | Fidel Elie`;

	const robotsContent = determineRobotsTagContent(index, follow);

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				{ description && <meta name="description" content={description} /> }
				{
					keywords && (
						<meta
							name="keywords"
							content={typeof keywords === "string" ? keywords : keywords.join(",")}
						/>
					)
				}
				{ robotsContent && <meta name="robots" content={robotsContent} /> }
			</Head>
			<div className="flex flex-col min-h-screen">
				{header && <header className={headerClassName}>{header}</header>}
				<div className="flex flex-grow">
					{
						aside && (
							<aside className={joinClasses("flex-shrink-0", asideClassName)}>
								{aside}
							</aside>
						)
					}
					<main className={joinClasses("flex-grow", mainClassName)}>
						{children}
					</main>
				</div>
				{footer}
			</div>
		</>
	)
}

const determineRobotsTagContent = (index: boolean | undefined, follow: boolean | undefined) => {
	const getIndexFlag = (indexProp: boolean) => indexProp ? "index" : "noindex";

	const getFollowFlag = (followProp: boolean) => followProp ? "follow" : "follow";

	const indexFlag = (index === true || index === false) ? getIndexFlag(index) : null;
	const followFlag = (follow === true || follow === false) ? getFollowFlag(follow) : null;

	return [indexFlag, followFlag].filter(flag => !!flag).join(",")
}

export interface PageProps {
	header?: ReactNode,
	aside?: ReactNode,
	footer?: ReactNode,

	headerClassName?: string,
	asideClassName?: string,
	mainClassName?: string,

	title?: string,
	description?: string,
	index?: boolean,
	follow?: boolean,
	keywords?: string | string[],

	children: ReactNode
}

export type InheritedPageProps = Omit<
	PageProps,
	"header" | "aside" | "footer" | "headerClassName" | "asideClassName" | "mainClassName"
>;
