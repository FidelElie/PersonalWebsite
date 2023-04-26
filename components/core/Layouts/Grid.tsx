import { ElementType, ReactNode, forwardRef } from "react";

import { clc } from "@/library/utilities";

export const Grid = forwardRef<HTMLElement, GridProps>((props, ref) => {
	const { as: Tag = "div", className, children } = props;

	return (
		<Tag ref={ref} className={clc("grid", className)}>
			{ children }
		</Tag>
	)
});

export interface GridProps {
	as?: ElementType;
	className?: string;
	children: ReactNode;
}
