import { ChangeEventHandler, forwardRef } from "react";

export const LongTextField = forwardRef<HTMLTextAreaElement, LongTextFieldProps>((props, ref) => {
	const {
		id,
		label,
		value,
		placeholder,
		onChange,
		required,
		disabled,
		rows
	} = props;

	const dispatchOnChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
		if (onChange && !disabled) { onChange(event.target.value); }
	}

	return (
		<div className="flex">
			<label htmlFor={id} className="sr-only">{label}</label>
			<textarea
				id={id}
				ref={ref}
				value={value}
				placeholder={placeholder}
				rows={rows}
				className="w-full rounded border text-sm border-gray-300 font-light tracking-tight py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-100"
				onChange={dispatchOnChange}
				required={required}
			/>
		</div>
	)
});

LongTextField.displayName = "LongTextField";

export interface LongTextFieldProps {
	id: string,
	label: string,
	placeholder?: string,
	value?: string,
	onChange?: (text: string) => void,
	disabled?: boolean,
	required?: boolean,
	rows?: number
}

