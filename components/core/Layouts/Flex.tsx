import { ElementType, ReactNode, forwardRef } from "react";

import { clc } from "@/library/utilities";

export const Flex = forwardRef<HTMLElement, FlexProps>((props, ref) => {
	const { as: Tag = "div", className, children } = props;

	return (
		<Tag ref={ref} className={clc("flex", className)}>
			{ children }
		</Tag>
	)
});

export interface FlexProps {
	as?: ElementType;
	className?: string;
	children: ReactNode;
}
