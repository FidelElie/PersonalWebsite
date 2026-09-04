import { clc } from "@/library/utilities";
import { ElementType, ReactNode, forwardRef } from "react";

export const Container = forwardRef<HTMLElement, ContainerProps>((props, ref) => {
	const { as: Tag = "div", className, children } = props;

	return (
		<Tag className={clc("container", className)} ref={ref}>
			{ children }
		</Tag>
	)
});

Container.displayName = "Container";

export interface ContainerProps {
	as?: ElementType,
	className?: string,
	children: ReactNode
}
