import { ChangeEventHandler, FocusEventHandler, forwardRef } from "react";
import classNames from "classnames";

const TextField = forwardRef<HTMLInputElement, { label: string } & ReturnType<any>>((props: TextFieldProps, ref) => {
	const {
		label,
		placeholder,
		icon: Icon,
		email,
		secure,
		value,
		onChange,
		onFocus,
		onBlur,
		...otherProps
	} = props;

	return (
		<div className="flex bg-white rounded-md items-center">
			<label className="sr-only">{label}</label>
			{
				Icon && (
					<div className="px-2">
						<Icon className="text-tertiary w-6 h-auto" />
					</div>
				)
			}
			<input
				ref={ref}
				className={classNames("w-full py-2.5 px-2 focus:outline-primary shadow-lg", {
					"rounded-r-md": Icon,
					"rounded-md": !Icon
				})}
				type={email ? "email" : secure ? "password" : "text"}
				placeholder={placeholder || label}
				value={value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				{...otherProps}
			/>
		</div>
	)
})

interface TextFieldProps {
	label: string,
	placeholder?: string,
	icon?: Function,
	email?: boolean,
	secure?: boolean,
	value?: string,
	onChange?: ChangeEventHandler<HTMLInputElement>,
	onFocus?: FocusEventHandler<HTMLInputElement>,
	onBlur?: FocusEventHandler<HTMLInputElement>
}

export default TextField;
export type { TextFieldProps }
