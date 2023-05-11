import { ChangeEventHandler, ReactNode, forwardRef } from "react";

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
		disabled,
		required,
		left,
		right
	} = props;

	const dispatchOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		if (!disabled && onChange) { onChange(event.target.value); }
	}

	return (
		<div className={clc(
			"border rounded border-gray-300 overflow-hidden",
			"dark:bg-gray-700 dark:border-gray-100",
			className,
		)}>
			{ left }
			<label className={clc("sr-only", labelClassName)} htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				className={clc(
					"w-full font-light tracking-tight text-sm",
					"dark:text-white",
					"border-transparent focus:border-transparent focus:ring-0",
					inputClassName
				)}
				ref={ref}
				value={value}
				type={type}
				placeholder={placeholder}
				onChange={dispatchOnChange}
				disabled={disabled}
				required={required}
			/>
			{ right }
		</div>
	)
});

const EmailField = forwardRef<HTMLInputElement, TypedTextFieldProps>(
	(props, ref) => <BaseTextField {...props} type="email" ref={ref}/>
);
const PasswordField = forwardRef<HTMLInputElement, TypedTextFieldProps>(
	(props, ref) => <BaseTextField {...props} type="password" ref={ref}/>
);


BaseTextField.displayName = "TextField";
EmailField.displayName = "TextField";
PasswordField.displayName = "TextField";

export interface BaseTextFieldProps {
	label: string;
	id: string;
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	type?: "text" | "email" | "password";
	value?: string;
	onChange?: (text: string) => void;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	left?: ReactNode;
	right?: ReactNode;
}

export interface TypedTextFieldProps extends Omit<BaseTextFieldProps, "type"> {}

export const TextField = Object.assign(
	BaseTextField,
	{ Email: EmailField, Password: PasswordField }
);
