import { forwardRef, type ElementType, type ReactNode } from "react";

import { joinClasses } from "@/library/utilities";

export const Flex = forwardRef<FlexRef, FlexProps>((props, ref) => {
	const { className, as: Tag = "div", children } = props;

	return (
		<Tag
			ref={ref}
			className={joinClasses("flex", className)}
		>
			{ children }
		</Tag>
	)
});

type FlexRef = HTMLElement;

export interface FlexProps {
	className?: string,
	as?: ElementType,
	children: ReactNode
}
