import {
	forwardRef,
	type MouseEventHandler,
	type MouseEvent,
	type ReactNode
} from "react";

import ButtonStyles from "./Button.module.css";

import { joinClasses } from "@/library/utilities";

import { LinkConfig, type LinkConfigType } from "../Navigation/Link";

const ButtonThemes = ["Primary", "Secondary", "Tertiary"] as const;

export const ButtonConfig = (props: ButtonConfigType) => {
	const { theme, alternate, connect } = props;

	return joinClasses(
		ButtonStyles.Button,
		theme && ButtonStyles.ButtonBase,
		theme && ButtonStyles[`${theme}${alternate ? "Alt" : ""}`],
		!connect && "rounded",
		connect === "top" && "rounded-b",
		connect === "left" && "rounded-r",
		connect === "right" && "rounded-l",
		connect === "bottom" && "rounded-t",
	)
}

const BaseButton = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
	const {
		className,
		onClick,
		type = "button",
		link,
		disabled,
		children
	} = props;

	const dispatchOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		if (onClick && !disabled) {
			onClick(event);
		}
	}

	return (
		<button
			ref={ref}
			className={joinClasses(
				!link ? ButtonConfig(props) : LinkConfig(props),
				className
			)}
			onClick={dispatchOnClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	)
});

const LinkButton = forwardRef<ButtonRef, Omit<ButtonLinkProps, "link">>(
	(props, ref) => <Button ref={ref} {...props} link />
);

const SubmitButton = forwardRef<ButtonRef, Omit<ButtonBaseProps, "type">>(
	(props, ref) => <Button ref={ref} {...props} type="submit" />
);

type ButtonRef = HTMLButtonElement;

export type ButtonConfigType = {
	theme?: typeof ButtonThemes[number],
	alternate?: boolean,
	connect?: boolean | "top" | "left" | "right" | "bottom",
}

interface ButtonInterfaceProps {
	className?: string,
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
	type?: "button" | "submit",
	disabled?: boolean,
	link?: boolean,
	children: ReactNode
}

type ButtonBaseProps = ButtonInterfaceProps & ButtonConfigType;
type ButtonLinkProps = ButtonInterfaceProps & LinkConfigType;

export type ButtonProps = ButtonBaseProps | ButtonLinkProps;

export const Button = Object.assign({}, BaseButton, { Link: LinkButton, Submit: SubmitButton });
