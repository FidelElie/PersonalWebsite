import { forwardRef } from "react";

export const Divider = forwardRef<HTMLHRElement, DividerProps>((props, ref) => {
	const { className } = props;

	return (
		<hr ref={ref} className={className}/>
	)
});

Divider.displayName = "Divider";

export interface DividerProps {
	className?: string,
}
