import { ElementType, ReactNode } from "react";
import { joinClasses } from "@/library/utilities";

const Box = (props: BoxProps) => {
	const {
		className,
		as: Tag = "div",
		screen,
		parent,
		children
	} = props;
	return (
		<Tag
			className={joinClasses(
				{
					"w-screen h-screen": screen,
					"w-full h-full": parent,
					[className as string]: className
				}
			)}
		>
			{children}
		</Tag>
	)
}

interface BoxProps {
	className?: string,
	as?: ElementType,
	screen?: boolean,
	parent?: boolean,
	children: ReactNode
}

Box.Screen = (props: Omit<BoxProps, "screen">) => <Box screen {...props} />;

export default Box;
export type { BoxProps }
