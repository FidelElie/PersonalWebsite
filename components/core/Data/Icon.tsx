import { forwardRef } from "react";

import { IconNames } from "./Icon.data";

export const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
	const { className, name } = props;

	return (
		<svg className={className} ref={ref} width="1em" height="1em" fill="currentColor">
			<use href={`/remixicon.symbol.svg#ri-${name}`}></use>
		</svg>
	)
});

Icon.displayName = "Icon";

export interface IconProps {
	className?: string,
	name: typeof IconNames[number]
}

export { IconNames }
