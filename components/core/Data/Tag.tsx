import clsx from "clsx";
import type { ReactNode } from "react";

import TagStyles from "./Tag.module.css";

const colorMap = {
	primary: "bg-primary",
	secondary: "bg-secondary",
	tertiary: "bg-tertiary",
	accent1: "bg-accent1",
	accent2: "bg-accent2"
}

const Tag = (props: TagProps) => {
	const { className, bg = 'primary', children } = props;

	return (
		<div className={clsx(
			TagStyles.Tag,
			bg && colorMap[bg],
			className
		)}>
			{ children }
		</div>
	)
}

interface TagProps {
	className?: string,
	bg?: keyof typeof colorMap,
	children: ReactNode
}

export default Tag;
export type { TagProps }
