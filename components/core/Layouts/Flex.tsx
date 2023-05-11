import { ElementType, ReactNode, forwardRef } from "react";

import { clc } from "@/library/utilities";

const FLEX_DIRECTIONS = {
	row: "flex-row",
	column: "flex-col",
	"row-reverse": "flex-row-reverse",
	"column-reverse": "flex-col-reverse"
}

export const BaseFlex = forwardRef<HTMLElement, FlexProps>((props, ref) => {
	const { id, as: Tag = "div", className, direction = "row", onClick, children } = props;

	return (
		<Tag
			id={id}
			ref={ref}
			className={clc("flex", FLEX_DIRECTIONS[direction], className)}
			onClick={onClick}
		>
			{ children }
		</Tag>
	)
});

const Row = forwardRef<HTMLElement, DirectedFlexProps>((props, ref) => (
	<BaseFlex {...props} ref={ref} direction="row"/>
));
const Column = forwardRef<HTMLElement, DirectedFlexProps>((props, ref) => (
	<BaseFlex {...props} ref={ref} direction="column"/>
));
const RowReverse = forwardRef<HTMLElement, DirectedFlexProps>((props, ref) => (
	<BaseFlex {...props} ref={ref} direction="row-reverse"/>
));
const ColumnReverse = forwardRef<HTMLElement, DirectedFlexProps>((props, ref) => (
	<BaseFlex {...props} ref={ref} direction="column-reverse"/>
));

BaseFlex.displayName = "Flex";
Row.displayName = "Flex";
Column.displayName = "Flex";
RowReverse.displayName = "Flex";
ColumnReverse.displayName = "Flex";

export interface FlexProps {
	id?: string,
	as?: ElementType;
	className?: string;
	children: ReactNode;
	direction?: "row" | "column" | "row-reverse" | "column-reverse";
	onClick?: () => void
}

type DirectedFlexProps = Omit<FlexProps, "direction">;

export const Flex = Object.assign(BaseFlex, {
	Row,
	Column,
	RowReverse,
	ColumnReverse
});
