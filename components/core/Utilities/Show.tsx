import type { ReactNode } from "react";

export const Show = <T extends unknown>(props: ShowProps<T>) => {
	const { when, else: _else, children } = props;

	return (
		<>
			{
				when ? (
					typeof children === "function" ? children(when) : children
				) : (
					_else ? _else : null
				)
			}
		</>
	)
}

export interface ShowProps<T> {
	when: T,
	else?: ReactNode,
	children: ReactNode | ((value: T) => ReactNode)
}
