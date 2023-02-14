import { forwardRef, type ReactNode, type ComponentProps } from "react";
import NextLink from "next/link";

import LinkStyles from "./Link.module.css";

import { joinClasses } from "@/library/utilities";
import type { Never } from "@/library/types/utility.types";

import { ButtonConfig, type ButtonConfigType } from "../Inputs/Button";

export const LinkConfig = (props: LinkConfigType) => {
	const { neutral, alternate, wrapper } = props;

	if (wrapper) { return ""; }

	return joinClasses(
		LinkStyles.Link,
		(!neutral && !alternate) && LinkStyles.LinkPrimary,
		neutral && LinkStyles.LinkNeutral,
		alternate && LinkStyles.LinkAlternate
	);
}

const	LinkAnchor = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
	const { className, button, children, neutral, alternate, wrapper, ...linkProps } = props;

	return (
		<NextLink
			ref={ref}
			className={joinClasses(
				!button ? LinkConfig({ neutral, alternate, wrapper }) : ButtonConfig(props),
				className
			)}
			{...linkProps}
		>
			{children}
		</NextLink>
	)
});

const LinkButton = forwardRef<HTMLAnchorElement, Omit<LinkButtonProps, "button">>((props, ref) => {
	return <LinkAnchor ref={ref} {...props} button/>;
});

const LinkWrapper = forwardRef<HTMLAnchorElement, Omit<LinkAnchorProps, "wrapper">>(
	(props, ref) => <LinkAnchor ref={ref} {...props} wrapper/>
)


type NextLinkProps = ComponentProps<typeof NextLink>;

export type Union<A, B> = A & B

export type LinkConfigType = {
	neutral?: boolean,
	alternate?: boolean,
	wrapper?: boolean
}

interface LinkInterfaceProps extends NextLinkProps {
	className?: string,
	button?: boolean,
	children: ReactNode
}

type LinkAnchorProps = LinkInterfaceProps & LinkConfigType & Never<ButtonConfigType>;
type LinkButtonProps = LinkInterfaceProps & ButtonConfigType & Never<LinkConfigType>;

export type LinkProps = LinkAnchorProps | LinkButtonProps;

export const Link = Object.assign({}, LinkAnchor, { Button: LinkButton, Wrapper: LinkWrapper });
