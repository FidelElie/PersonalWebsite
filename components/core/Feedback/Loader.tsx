import { ReactNode, forwardRef } from "react";

export const Loader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
	const { children } = props;

	return (
		<div className="flex items-center space-x-2" ref={ref}>
			<svg
				width="1em"
				height="1em"
				fill="currentColor"
				className="text-3xl text-primary animate-spin mr-1.5 dark:text-white"
			>
				<use href={`/remixicon.symbol.svg#ri-loader-5-fill`}></use>
			</svg>
			<span className="text-sm font-light dark:text-white">
				{ children }
			</span>
		</div>
	)
})

export interface LoaderProps {
	children: ReactNode;
}
