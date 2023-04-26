import { ElementType, ReactNode, forwardRef } from "react";

import { clc } from "@/library/utilities";

export const BaseHeading = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
	const {
		id,
		className,
		level = 1,
		underline,
		children
	} = props;

	const Tag = `h${level}` as ElementType;

	return (
		<Tag
			id={id}
			ref={ref}
			className={clc(
				"dark:text-white",
				underline && "underline decoration-primary underline-offset-4",
				className,
			)}
		>
			{ children }
		</Tag>
	)
});

export interface HeadingProps {
	className?: string,
	id?: string,
	level?: 1 | 2 | 3 | 4 | 5 | 6,
	underline?: boolean,
	children: ReactNode
}

type HeadingPropsWithLevel = Omit<HeadingProps, "level">;

export const Heading = Object.assign(BaseHeading, {
	One: (props: HeadingPropsWithLevel) => <BaseHeading {...props} level={1}/>,
	Two: (props: HeadingPropsWithLevel) => <BaseHeading {...props} level={2}/>,
	Three: (props: HeadingPropsWithLevel) => <BaseHeading {...props} level={3}/>,
	Four: (props: HeadingPropsWithLevel) => <BaseHeading {...props} level={4}/>,
	Five: (props: HeadingPropsWithLevel) => <BaseHeading {...props} level={5}/>,
	Six: (props: HeadingPropsWithLevel) => <BaseHeading {...props} level={6}/>,
})


