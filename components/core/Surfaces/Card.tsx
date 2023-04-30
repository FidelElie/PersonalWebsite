import { clc } from "@/library/utilities";
import { ElementType, ReactNode, forwardRef } from "react";

export const Card = forwardRef<HTMLElement, CardProps>((props, ref) => {
	const { as: Tag = "div", className, children } = props;

	return (
		<Tag
			ref={ref}
			className={clc(
				"border bg-white border-gray-300 rounded",
				"dark:bg-gray-700 dark:border-gray-500",
				className
			)}
		>
			{ children }
		</Tag>
	)
});

Card.displayName = "Card";

export interface CardProps {
	as?: ElementType,
	className?: string,
	children: ReactNode
}
