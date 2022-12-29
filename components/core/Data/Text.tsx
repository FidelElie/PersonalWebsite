import type { ReactNode } from "react";

const Text = (props: TextProps) => {
	const { className, as: Tag = "p", children } = props;

	return (
		<Tag className={className}>
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
