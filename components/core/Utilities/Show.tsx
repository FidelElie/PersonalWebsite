import type { ReactNode } from "react";

export const Show = <T extends unknown>(props: ShowProps<T>) => {
	const { if: _if, else: _else = null, children } = props;

	if (!_if) { return <>{_else}</>; }

	return (<>{ typeof children === "function" ? children(_if) : children }</>)
}

export interface ShowProps<T> {
	if: T;
	else?: ReactNode;
	children: ((data: NonNullable<T>) => ReactNode) | ReactNode;
}
