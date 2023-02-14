import { forwardRef, type ReactNode, type ElementType, type CSSProperties } from "react";

export const Box = forwardRef<BoxRef, BoxProps>((props, ref) => {
	const {
		className,
		as: Tag = "div",
		style,
		children
	} = props;

	return (
		<Tag className={className} ref={ref} style={style}>
			{children}
		</Tag>
	)
});

type BoxRef = HTMLElement;

export interface BoxProps {
	className?: string,
	as?: ElementType,
	style?: CSSProperties,
	children?: ReactNode
}
