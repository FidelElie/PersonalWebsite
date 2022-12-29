import { ElementType, ReactNode } from "react";

const Box = (props: BoxProps) => {
	const { as: Tag = "div", className, children, } = props;

	return <Tag className={className}>{ children }</Tag>;
}

const Section = (props: BoxDiscreteProps) => <Box {...props} as="section" />;


interface BoxProps { as?: ElementType, className?: string, children?: ReactNode }

type BoxDiscreteProps = Omit<BoxProps, "as">;

Box.Section = Section;

export default Box;
export type { BoxProps, BoxDiscreteProps }
