import { ReactNode, forwardRef } from "react";
import Head from "next/head";

import { clc } from "@/library/utilities";

export const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
	const {
		title,
		className,
		asideClassName,
		headerClassName,
		mainClassName,
		footerClassName,
		aside,
		header,
		footer,
		children
	} = props;

	return (
		<div className={clc("flex", className)} ref={ref}>
			<Head>
				{ title && <title>{title}</title> }
			</Head>
			<aside className={clc(asideClassName)}>
				{ aside }
			</aside>
			<div className="flex flex-col w-full">
				{ header && <header className={clc(headerClassName)}>{ header }</header> }
				<main className={clc(mainClassName)}>
					{ children }
				</main>
				<PageFooter footerClassName={footerClassName} footer={footer}/>
			</div>
		</div>
	)
});

const PageFooter = ({ footerClassName, footer }: PageFooterProps) => {
	if (footerClassName) return (
		<footer className={footerClassName}>
			{footer}
		</footer>
	)

	return <>{footer}</>;
}

Page.displayName = "Page";

export interface PageProps {
	title?: string,
	className?: string;
	asideClassName?: string;
	headerClassName?: string;
	mainClassName?: string;
	footerClassName?: string;
	aside?: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
	children: ReactNode;
}

type PageFooterProps = Pick<PageProps, "footerClassName" | "footer">;

export type PageConfiguredProps = Pick<PageProps, "title" | "children">;
