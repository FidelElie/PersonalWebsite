import React, { MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

import { LinkConfig } from "../Navigation/Link";

const ButtonConfig = {
	base: "px-4 h-12 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50",
	themes: {
		primary: "bg-purple text-white",
		secondary: "bg-green text-white"
	}
}

const Button = (props: ButtonProps) => {
	const {
		className,
		type,
		onClick,
		theme = "primary",
		disabled,
		custom,
		children
	} = props;

	if (!Object.keys(ButtonConfig.themes).includes(theme)) {
		throw new TypeError(`Unsupported theme provided, found ${theme}`);
	}

	return (
		<button
			type={type}
			onClick={onClick}
			className={classNames(
				(!custom) && ButtonConfig.base,
				(!custom && theme) && ButtonConfig.themes[theme],
				className
			)}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

const SubmitButton = (props: Omit<ButtonProps, "type">) => <Button type="submit" {...props} />;

const LinkButton = (props: ButtonProps & { alt?: boolean }) =>	{
	const { className, alt, ...otherProps } = props;

	return (
		<Button
			className={classNames(
				LinkConfig.base,
				{
					[LinkConfig.primary]: !alt,
					[LinkConfig.alternate]: alt,
				},
				className
			)}
			custom
			{...otherProps}
		/>
	)
}

interface ButtonProps {
	className?: string,
	type?: "button" | "submit" | "reset",
	theme?: keyof typeof ButtonConfig.themes,
	onClick?: MouseEventHandler<HTMLButtonElement>,
	disabled?: boolean,
	custom?: boolean,
	children?: ReactNode
}

type ButtonTypedProps = Omit<ButtonProps, "type">;
type LinkButtonProps = ButtonProps & { alt?: boolean }

Button.Submit = SubmitButton;
Button.Link = LinkButton;

export default Button;
export { ButtonConfig }
export type { ButtonProps, ButtonTypedProps, LinkButtonProps }
