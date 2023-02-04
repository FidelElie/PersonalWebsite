import { forwardRef } from "react";

import { joinClasses } from "@/library/utilities";

const Icon = forwardRef<IconRef, IconProps>((props, ref) => {
	const { className, name, type = "fill", identifier } = props;

	if (!identifier && !name) {
		console.warn("No identifier was found for Icon");
		return null;
	}

	const parseIconName = () => name ? `ri-${name}-${type}` : identifier;

	return (
		<i ref={ref} className={joinClasses(parseIconName(), className)}/>
	)
});

export type IconRef = HTMLLIElement;

export interface IconProps {
	className?: string,
	name?: string,
	type?: "fill" | "line",
	identifier?: string
}

export default Icon;
