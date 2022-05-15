import React, { ReactNode } from "react";
import { joinClasses } from "@/library/utilities";

const Text = (props: TextProps) => {
	const {
		className,
		as: Tag = "p",
		// size,
		// color = "DEFAULT",
		// weight,
		// decoration,
		// decorationStyle,
		// decorationColor,
		// tracking,
		children
	} = props;

	return (
		<Tag className={joinClasses()}>
			{children}
		</Tag>
	)
}

interface TextProps {
	as?: "p" | "span" | "i" | "b",
	// size?: keyof typeof theme.sizes,
	// color?: keyof typeof theme.colors,
	// weight?: keyof typeof theme.weights,
	// decoration?: keyof typeof theme.decorations,
	// decorationStyle?: keyof typeof theme.decorationStyles,
	// decorationColor?: keyof typeof theme.colors,
	// tracking?: keyof typeof theme.trackings,
	className?: string,
	children: ReactNode
}

type TextTypeProps = Omit<TextProps, "as">;

Text.Bold = (props: TextTypeProps) => <Text as="b" {...props} />;
Text.Italic = (props: TextTypeProps) => <Text as="i" {...props} />;
Text.Inline = (props: TextTypeProps) => <Text as="span" {...props} />;

export default Text;
export type { TextProps }
