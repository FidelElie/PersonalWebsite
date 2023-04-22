import { ReactNode, forwardRef } from "react";

import { clc } from "@/library/utilities";

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
	const { id, className, disabled, type = "button", onClick, children } = props;

	const dispatchOnClick = () => { if (!disabled && onClick) { onClick(); } }

	return (
		<button
			id={id}
			ref={ref}
			className={clc(
				"bg-blue-500 text-white rounded px-2.5 py-1.5 font-light flex shadow-sm",
				className
			)}
			disabled={disabled}
			onClick={dispatchOnClick}
			type={type}
		>
			{ children }
		</button>
	)
});

const SubmitButton = forwardRef<HTMLButtonElement, TypedButtonProps>(
	(props, ref) => <BaseButton {...props} type="submit" ref={ref}/>
);

const ResetButton = forwardRef<HTMLButtonElement, TypedButtonProps>(
	(props, ref) => <BaseButton {...props} type="reset" ref={ref}/>
)

export interface BaseButtonProps {
	id?: string;
	className?: string;
	disabled?: boolean;
	children?: ReactNode;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
}

export interface TypedButtonProps extends Omit<BaseButtonProps, "type"> {}

export const Button = Object.assign(BaseButton, { Submit: SubmitButton, Reset: ResetButton });
