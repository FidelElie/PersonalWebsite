import { ChangeEventHandler, forwardRef } from "react";

import { clc } from "@/library/utilities";

const BaseTextField = forwardRef<HTMLInputElement, BaseTextFieldProps>((props, ref) => {
	const {
		className,
		labelClassName,
		inputClassName,
		type = "text",
		value,
		label,
		id,
		placeholder,
		onChange,
		disabled
	} = props;

	const dispatchOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		if (!disabled && onChange) { onChange(event.target.value); }
	}

	return (
		<div className={className}>
			<label className={clc("sr-only", labelClassName)} htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				className={clc(
					"border rounded-sm text-sm border-gray-200 w-full font-light tracking-tight",
					inputClassName
				)}
				ref={ref}
				value={value}
				type={type}
				placeholder={placeholder}
				onChange={dispatchOnChange}
				disabled={disabled}
			/>
		</div>
	)
});

const EmailField = forwardRef<HTMLInputElement, TypedTextFieldProps>(
	(props, ref) => <BaseTextField {...props} type="email" ref={ref}/>
);
const PasswordField = forwardRef<HTMLInputElement, TypedTextFieldProps>(
	(props, ref) => <BaseTextField {...props} type="password" ref={ref}/>
);

export interface BaseTextFieldProps {
	label: string,
	id: string,
	className?: string,
	labelClassName?: string,
	inputClassName?: string,
	type?: "text" | "email" | "password",
	value?: string,
	onChange?: (text: string) => void,
	placeholder?: string,
	disabled?: boolean
}

export interface TypedTextFieldProps extends Omit<BaseTextFieldProps, "type"> {}

export const TextField = Object.assign(
	BaseTextField,
	{ Email: EmailField, Password: PasswordField }
);
