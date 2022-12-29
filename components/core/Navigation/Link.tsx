import NextLink from "next/link";
import type { ComponentProps } from "react";

const Link = (props: LinkProps) => {
	return (
		<NextLink {...props}/>
	)
}

interface LinkProps extends ComponentProps<typeof NextLink> { }

export default Link;
export type { LinkProps }
