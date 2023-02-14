import { FormEvent, FormEventHandler, forwardRef, ReactNode } from "react";

export const Form = forwardRef<FormRef, FormProps>((props, ref) => {
	const { className, onSubmit, server, children } = props;

	const dispatchOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		if (!onSubmit) { return; }
		event.preventDefault();

		onSubmit(event);
	}

	return (
		<form
			ref={ref}
			className={className}
			onSubmit={dispatchOnSubmit}
			{...(server ? server : {})}
		>
			{children}
		</form>
	)
});

export type FormRef = HTMLFormElement;

export interface FormProps {
	className?: string,
	onSubmit?: (event: FormEvent<HTMLFormElement>) => any,
	server?: {
		action: string,
		method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
	},
	children: ReactNode
}
