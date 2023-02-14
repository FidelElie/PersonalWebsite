import { type ElementType, forwardRef, type HTMLAttributes } from "react";

import { joinClasses } from "@/library/utilities";

const BaseHeading = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
	const { className, level = 1 ,children } = props;

	const Tag = `h${level}` as ElementType;

	return (
		<Tag
			ref={ref}
			className={joinClasses(className)}
		>
			{children}
		</Tag>
	)
});

const HeadingTypes = {
	One: forwardRef<HTMLHeadingElement, HeadingProps>(
		(props, ref) => <BaseHeading {...props} ref={ref} level={1} />
	),
	Twp: forwardRef<HTMLHeadingElement, HeadingProps>(
		(props, ref) => <BaseHeading {...props} ref={ref} level={2} />
	),
	Three: forwardRef<HTMLHeadingElement, HeadingProps>(
		(props, ref) => <BaseHeading {...props} ref={ref} level={3} />
	),
	Four: forwardRef<HTMLHeadingElement, HeadingProps>(
		(props, ref) => <BaseHeading {...props} ref={ref} level={4} />
	),
	Five: forwardRef<HTMLHeadingElement, HeadingProps>(
		(props, ref) => <BaseHeading {...props} ref={ref} level={5} />
	),
	Six: forwardRef<HTMLHeadingElement, HeadingProps>(
		(props, ref) => <BaseHeading {...props} ref={ref} level={6} />
	)
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	level: 1 | 2 | 3 | 4 | 5 | 6
}

export const Heading = Object.assign({}, BaseHeading, HeadingTypes);
