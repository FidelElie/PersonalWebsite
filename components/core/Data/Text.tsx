import type { ReactNode } from "react";
import clsx from "clsx";

const Text = (props: TextProps) => {
	const { className, as: Tag = "p", children } = props;

	return (
		<Tag className={clsx("font-text font-light", className)}>
			{ children }
		</Tag>
	)
}

interface TextProps {
	className?: string,
	as?: "p" | "b" | "i" | 'span',
	children: ReactNode
}

export default Text;
export type { TextProps }
