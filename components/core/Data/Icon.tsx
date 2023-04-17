import { forwardRef } from "react";

export const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
	const { className, name } = props;

	return (
		<svg className={className} ref={ref} width="1em" height="1em" fill="currentColor">
			<use href={`/remixicon.symbol.svg#ri-${name}`}></use>
		</svg>
	)
});

export interface IconProps {
	className?: string,
	name: string
}
