import { ReactNode } from "react";
import NextLink from "next/link";

import { joinClasses } from "@/library/utilities";

const LinkConfig = {
	base: "underline underline-offset-2 decoration-2 decoration-cyan-600",
	primary: "text-light hover:text-cyan-600",
	alternate: "text-cyan-600 hover:text-cyan-400 font-semibold",
}

const Link = (props: LinkProps) => {
	const { href, as, alt, children } = props;
	return (
		<NextLink href={href} as={as}>
			<a className={joinClasses(
				LinkConfig.base,
				{
					[LinkConfig.primary]: !alt,
					[LinkConfig.alternate]: alt
				}
			)}>
				{children}
			</a>
		</NextLink>
	)
}

interface LinkProps {
	href: string | object,
	as?: string | object,
	alt?: boolean,
	children: ReactNode
}

export default Link;
export { LinkConfig }
export type { LinkProps }
