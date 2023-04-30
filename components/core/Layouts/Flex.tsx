import { ElementType, ReactNode, forwardRef } from "react";

import { clc } from "@/library/utilities";

const FLEX_DIRECTIONS = {
	row: "flex-row",
	column: "flex-col",
	"row-reverse": "flex-row-reverse",
	"column-reverse": "flex-col-reverse"
}

export const BaseFlex = forwardRef<HTMLElement, FlexProps>((props, ref) => {
	const { as: Tag = "div", className, direction = "row", children } = props;

	return (
		<Tag
			ref={ref}
			className={clc("flex", FLEX_DIRECTIONS[direction], className)}
		>
			{ children }
		</Tag>
	)
});

BaseFlex.displayName = "Flex";

export interface FlexProps {
	as?: ElementType;
	className?: string;
	children: ReactNode;
	direction?: "row" | "column" | "row-reverse" | "column-reverse"
}

type DirectedFlexProps = Omit<FlexProps, "direction">;

export const Flex = Object.assign(BaseFlex, {
	Row: (props: DirectedFlexProps) => <BaseFlex {...props} direction="row"/>,
	Column: (props: DirectedFlexProps) => <BaseFlex {...props} direction="column"/>,
	RowReverse: (props: DirectedFlexProps) => <BaseFlex {...props} direction="row-reverse"/>,
	ColumnReverse: (props: DirectedFlexProps) => <BaseFlex {...props} direction="column-reverse"/>
});
