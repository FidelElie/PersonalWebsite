import { FormEventHandler, ReactNode, forwardRef } from "react";

export const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
	const { className, onSubmit, children } = props;

	const dispatchOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		if (!onSubmit) { return; }
		event.preventDefault();

		onSubmit();
	}

	return (
		<form className={className} onSubmit={dispatchOnSubmit}>
			{ children }
		</form>
	)
});

export interface FormProps {
	className?: string,
	onSubmit?: () => void,
	children: ReactNode
}
