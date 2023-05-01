import {
	AriaRole,
	CSSProperties,
	ElementType,
	MouseEventHandler,
	ReactNode,
	WheelEventHandler,
	forwardRef
} from "react";

export const Box = forwardRef<HTMLElement, BoxProps>((props, ref) => {
	const {
		as: Tag = "div",
		className,
		onClick,
		children,
		...elementProps
	} = props;

	return (
		<Tag
			ref={ref}
			className={className}
			onClick={onClick}
			{...elementProps}
		>
			{children}
		</Tag>
	)
});

Box.displayName = "Box";

export interface BoxProps {
	id?: string,
	as?: ElementType;
	style?: CSSProperties;
	className?: string;
	onClick?: MouseEventHandler<HTMLElement>;
	role?: AriaRole;
	onMouseDown?: MouseEventHandler<HTMLElement>;
	onMouseMove?: MouseEventHandler<HTMLElement>;
	onWheel?: WheelEventHandler<HTMLElement>;
	onMouseUp?: MouseEventHandler<HTMLElement>;
	children?: ReactNode;
}
