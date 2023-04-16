import { ComponentProps, forwardRef } from "react";
import NextLink from "next/link";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
	const { className, children, ...linkProps } = props;

	return (
		<NextLink className={className} ref={ref} {...linkProps}>
			{ children }
		</NextLink>
	)
});

export interface LinkProps extends ComponentProps<typeof NextLink> {

}
