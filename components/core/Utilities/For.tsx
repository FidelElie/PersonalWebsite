import type { ReactNode } from "react";

export const For = <T extends any>(props: ForProps<T>) => {
	const { each, else: _else = null, children } = props;

	return (
		<>
			{
				each.length ? (
					Array.from(
						each,
						(item, index) => children(item, index)
					)

				) : (
					_else
				)
			}
		</>
	)
}

export interface ForProps<T> {
	each: T[],
	else: ReactNode,
	children: (item: T, index: number) => JSX.Element
}
