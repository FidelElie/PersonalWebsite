import { ElementType, forwardRef, ReactNode } from "react";

import { joinClasses } from "@/library/utilities";

export const Container = forwardRef<HTMLElement, ContainerProps>((props, ref) => {
	const { className, as: Tag = "div", children } = props;

	return (
		<Tag ref={ref} className={joinClasses("container", className)}>
			{ children }
		</Tag>
	)
})

export interface ContainerProps {
	className?: string,
	as?: ElementType,
	children: ReactNode
}
