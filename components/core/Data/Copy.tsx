import { ReactNode, forwardRef } from "react";

import { clc } from "@/library/utilities";

const BaseCopy = forwardRef<AsElements, BaseCopyProps>((props, ref) => {
	const {
		id,
		htmlFor,
		className,
		as: Tag = "p",
		children
	} = props;

	// FIXME cheated with referenece type
	return (
		<Tag
			id={id}
			htmlFor={htmlFor}
			className={clc("font-light text-gray-500 dark:text-white", className)}
			ref={ref as any}
		>
			{ children }
		</Tag>
	)
});

const InlineText = (props: TypedCopyProps) => <BaseCopy {...props} as="span"/>;
const BoldText = (props: TypedCopyProps) => <BaseCopy {...props} as="b"/>;
const ItalicText = (props: TypedCopyProps) => <BaseCopy {...props} as="b"/>;
const LabelText = (props: TypedCopyProps) => <BaseCopy {...props} as="label"/>;

type AsElements = HTMLParagraphElement | HTMLSpanElement | HTMLLabelElement;

export interface BaseCopyProps {
	id?: string,
	htmlFor?: string,
	className?: string,
	as?: "p" | "span" | "b" | "i" | "label",
	children?: ReactNode
}

export type TypedCopyProps = Omit<BaseCopyProps, "as">;

export const Copy = Object.assign(BaseCopy, {
	Inline: InlineText,
	Bold: BoldText,
	Italic: ItalicText,
	Label: LabelText
});
