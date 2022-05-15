import { ElementType, ReactNode } from "react";

import "./Container.scss";

import { joinClasses } from "@/library/utilities";

const Container = (props: ContainerProps ) => {
	const {
		as: Tag = "div",
		className,
		children
	} = props;

	return (
		<Tag
			className={joinClasses("container", {
				[className as string]: className
			})}
		>
			{ children }
		</Tag>
	)
}

interface ContainerProps {
	as?: ElementType | ((props: any) => JSX.Element),
	className?: string,
	children: ReactNode
}

export default Container;
export type { ContainerProps }
