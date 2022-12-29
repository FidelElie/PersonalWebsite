import clsx from "clsx";
import type { ElementType, ReactNode } from "react";

const flexAlignments = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	evenly: "items-evenly",
	between: "items-between",
	spaced: "items-spaced"
}

const flexJustifications = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	evenly: "justify-evenly",
	between: "justify-between",
	spaced: "justify-spaced"
}

const Flex = (props: FlexProps) => {
	const {
		className,
		as: Tag = "div",
		align,
		justify,
		inline,
		wrap,
		grow,
		shrink,
		children
	} = props;

	return (
		<Tag className={clsx(
			!!inline ? "inline-flex" : "flex",
			align && flexAlignments[align],
			justify && flexJustifications[justify],
			wrap === true && "flex-wrap",
			wrap === "reverse" && "flex-wrap-reverse",
			grow === true && "flex-grow",
			grow === false && "flex-grow-0",
			shrink === true && "flex-shrink",
			shrink === false && "flex-shrink-0",
			className
		)}>
			{ children }
		</Tag>
	)
}

const InlineFlex = (props: Omit<FlexProps, "inline">) => <Flex {...props} inline/>;

interface FlexProps {
	className?: string,
	as?: ElementType,
	align?: keyof typeof flexAlignments,
	justify?: keyof typeof flexJustifications,
	inline?: boolean,
	wrap?: true | "reverse",
	grow?: boolean,
	shrink?: boolean,
	children: ReactNode
}

Flex.Inline = InlineFlex;

export default Flex;
export type { FlexProps }
