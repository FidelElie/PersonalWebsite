import clsx from "clsx";
import Head from "next/head";
import type { ReactNode } from "react";

const Page = (props: PageProps) => {
	const {
		className,
		mainClassName,
		title = "Home",
		description,
		keywords,
		index,
		follow,
		header,
		children,
		container
	} = props;

	const pageTitle = `${title} | Fidel Elie`;

	const robotsContent = determineRobotsTagContent(index, follow);

	return (
		<div className={clsx("flex flex-col min-h-screen", className)}>
			<Head>
				<title>{pageTitle}</title>
				{ description && <meta name="description" content={description}/> }
				{
					keywords && (
						<meta
							name="keywords"
							content={typeof keywords === "string" ? keywords : keywords.join(",")}
						/>
					)
				}
				{ !robotsContent && <meta name="robots" content={robotsContent}/> }
			</Head>
			{ header && <header>{header}</header> }
			<main className={clsx(
				container && "px-5 container max-w-3xl pb-5 mx-auto md:px-0",
				mainClassName
			)}>
				{ children }
			</main>
		</div>
	)
}

const determineRobotsTagContent = (index: boolean | undefined, follow: boolean | undefined) => {
	const getIndexFlag = (indexProp: boolean) => indexProp ? "index" : "noindex";

	const getFollowFlag = (followProp: boolean) => followProp ? "follow" : "follow";

	const indexFlag = (index === true || index === false) ? getIndexFlag(index) : null;
	const followFlag = (follow === true || follow === false) ? getFollowFlag(follow) : null;

	return [indexFlag, followFlag].filter(flag => !!flag).join(",")
}

interface PageProps {
	className?: string,
	mainClassName?: string,
	title?: string,
	description?: string,
	keywords?: string | string[],
	index?: boolean,
	follow?: boolean,
	header?: ReactNode,
	container?: ReactNode,
	children: ReactNode
}

export default Page;
export type { PageProps }
