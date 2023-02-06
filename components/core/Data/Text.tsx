import { forwardRef, ReactNode } from "react";

import { joinClasses } from "@/library/utilities";

const TextElements = ["p", "span", "b", "i", "strong", "em", "mark"] as const;

const BaseText = forwardRef<any, TextProps>((props, ref) => {
	const { className, as: Tag = "p", children } = props;

	return (
		<Tag
			ref={ref}
			className={joinClasses(className)}
		>
			{children}
		</Tag>
	)
});

const TextTypes = {
	Bold: forwardRef<HTMLSpanElement, ElementTextProps>(
		(props, ref) => <BaseText {...props} ref={ref} as="b"/>
	),
	Italic: forwardRef<HTMLSpanElement, ElementTextProps>(
		(props, ref) => <BaseText {...props} ref={ref} as="i"/>
	),
	Inline: forwardRef<HTMLSpanElement, ElementTextProps>(
		(props, ref) => <BaseText {...props} ref={ref} as="span"/>
	),
	Important: forwardRef<HTMLSpanElement, ElementTextProps>(
		(props, ref) => <BaseText {...props} ref={ref} as="strong"/>
	),
	Emphasis: forwardRef<HTMLSpanElement, ElementTextProps>(
		(props, ref) => <BaseText {...props} ref={ref} as="em"/>
	),
}

export interface TextProps {
	className?: string,
	as?: typeof TextElements[number],
	children?: ReactNode
}

type ElementTextProps = Omit<TextProps, "as">;

const Text = Object.assign({}, BaseText, TextTypes);

export default Text;
