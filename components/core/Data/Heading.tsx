import type { ElementType, ReactNode } from "react"

const Heading = (props: HeadingProps) => {
	const { className, level = 1, children  } = props;

	const HeadingTag = `h${level}` as ElementType;

	return (
		<HeadingTag className={className}>
			{ children }
		</HeadingTag>
	)
}

interface HeadingProps {
	className?: string,
	level?: 1 | 2 | 3 | 4 | 5 | 6,
	children: ReactNode
}

export default Heading;
export type { HeadingProps }
