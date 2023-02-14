import { forwardRef, ReactNode, type InputHTMLAttributes } from "react";

import TextFieldStyles from "./TextField.module.css";

import { joinClasses } from "@/library/utilities";

const BaseTextField = forwardRef<TextFieldRef, TextFieldProps>((props, ref) => {
	const {
		id,
		label,
		name,
		type = "text",
		left,
		right,
		className,
		inputClassName,
		connect,
		placeholder,
		...inputProps
	} = props;

	const connections = joinClasses(
		!connect && "rounded",
		connect === "top" && "rounded-b",
		connect === "left" && "rounded-r",
		connect === "right" && "rounded-l",
		connect === "bottom" && "rounded-t",
	)

	return (
		<div className={joinClasses(
			TextFieldStyles.TextField,
			connections,
			className
		)}>
			<label htmlFor={id} className="sr-only">
				{label}
			</label>
			{left}
			<input
				ref={ref}
				id={id}
				name={name ?? id}
				placeholder={placeholder ?? label}
				type={type}
				className={joinClasses(
					TextFieldStyles.TextFieldInput,
					"border-transparent focus:border-transparent focus:ring-0",
					connections,
					inputClassName
				)}
				{...inputProps}
			/>
			{right}
		</div>
	)
});

const EmailField = forwardRef<TextFieldRef, TypedTextFieldProps>((props, ref) => (
	<BaseTextField ref={ref} {...props} type="email" />
));

const PasswordField = forwardRef<TextFieldRef, TypedTextFieldProps>((props, ref) => (
	<BaseTextField ref={ref} {...props} type="password" />
));

export type TextFieldRef = HTMLInputElement;

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string,
	label: string,
	left?: ReactNode,
	right?: ReactNode,
	name?: string,
	className?: string,
	inputClassName?: string,
	placeholder?: string,
	connect?: boolean | "top" | "left" | "right" | "bottom",
	type?: "text" | "email" | "password"
}

type TypedTextFieldProps = Omit<TextFieldProps, "type">;

export const TextField = Object.assign({}, BaseTextField, {
	Email: EmailField,
	Password: PasswordField
});
