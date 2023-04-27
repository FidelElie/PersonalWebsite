import {
	AriaRole,
	CSSProperties,
	ElementType,
	MouseEventHandler,
	ReactNode,
	forwardRef
} from "react";

export const Box = forwardRef<HTMLElement, BoxProps>((props, ref) => {
	const {
		as: Tag = "div",
		className,
		style,
		role,
		onClick,
		children
	} = props;

	return (
		<Tag ref={ref} className={className} style={style} role={role} onClick={onClick}>
			{children}
		</Tag>
	)
});


export interface BoxProps {
	as?: ElementType;
	style?: CSSProperties;
	className?: string;
	onClick?: MouseEventHandler<HTMLElement>;
	role?: AriaRole;
	children?: ReactNode;
}
