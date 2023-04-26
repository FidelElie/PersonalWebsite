import { CSSProperties, ElementType, ReactNode, forwardRef } from "react";

export const Box = forwardRef<HTMLElement, BoxProps>((props, ref) => {
	const { as: Tag = "div", className, style, children } = props;

	return (
		<Tag ref={ref} className={className} style={style}>
			{children}
		</Tag>
	)
});


export interface BoxProps {
	as?: ElementType;
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
}
