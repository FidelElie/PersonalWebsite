import { ReactNode, forwardRef } from "react";

import { clc } from "@/library/utilities";

export const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
	const {
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
			{ aside && <aside className={clc(asideClassName)}>{ aside }</aside> }
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

export type PageConfiguredProps = Pick<PageProps, "children">;
