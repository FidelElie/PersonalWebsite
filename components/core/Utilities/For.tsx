import type { ReactNode } from "react";

export const For = <T extends unknown>(props: ForProps<T>) => {
	const { each, else: _else = null, children } = props;

	const iterable = Array.from(each, (item) => children(item));

	if (!iterable.length) { return <>{_else}</> }

	return <>{iterable}</>
}

export interface ForProps<T> {
	each: Iterable<T>,
	else?: ReactNode;
	children: (data: T) => ReactNode
}
