import React, { ReactNode, ElementType } from "react";

import classNames from "classnames";

const FLEX_DIRECTIONS = {
	row: "flex-row",
	column: "flex-col",
	"row-reverse": "flex-row-reverse",
	"column-reverse": "flex-col-reverse"
}

const FLEX_ALIGNMENTS = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	between: "items-between",
	evenly: "items-evenly",
	around: "items-around"
}

const FLEX_JUSTIFICATIONS = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between",
	evenly: "justify-evenly",
	around: "justify-around"
}

const Flex = (props: FlexProps) => {
	const {
		className,
		as: Tag = "div",
		direction,
		align,
		justify,
		wrap,
		screen,
		parent,
		explicit,
		shrink,
		grow,
		children
	} = props;
	return (
		<Tag
			className={classNames(
				"flex",
				{
					[FLEX_DIRECTIONS[direction ?? "row"]]: !!direction,
					[FLEX_ALIGNMENTS[align ?? "start"]]: !!align,
					[FLEX_JUSTIFICATIONS[justify ?? "start"]]: !!justify,
					"w-screen h-screen": screen,
					"w-full h-full": parent,
					"min-h-0 min-w-0": explicit,
					"flex-wrap": wrap,
					"flex-wrap-reverse": wrap === "reverse",
					"flex-nowrap": !wrap,
					"grow": grow,
					"grow-0": !grow,
					"shrink": shrink,
					"shrink-0": !shrink,
					[className as string]: className
				}
			)}
		>
			{children}
		</Tag>
	)
}
interface FlexProps {
	className?: string,
	as?: ElementType,
	direction?: keyof typeof FLEX_DIRECTIONS,
	align?: keyof typeof FLEX_ALIGNMENTS,
	justify?: keyof typeof FLEX_JUSTIFICATIONS,
	wrap?: boolean | "reverse",
	screen?: boolean,
	parent?: boolean,
	shrink?: boolean,
	grow?: boolean,
	explicit?: boolean,
	children: ReactNode
}

type FlexDirectedProps = Omit<FlexProps, "direction">;

Flex.Row = (props: FlexDirectedProps) => <Flex direction="row" {...props} />;
Flex.Col = (props: FlexDirectedProps) => <Flex direction="column" {...props} />;
Flex.RowReverse = (props: FlexDirectedProps) => <Flex direction="row-reverse" {...props} />;
Flex.ColReverse = (props: FlexDirectedProps) => <Flex direction="column-reverse" {...props} />;

export default Flex;
export type { FlexProps, FlexDirectedProps }
