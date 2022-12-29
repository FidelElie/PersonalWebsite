import type { ReactNode } from "react";
import clsx from "clsx";

const List = (props: ListProps) => {
	const { className, ordered = false, children } = props;

	const ListTag = ordered ? "ol" : "ul";

	return (
		<ListTag
			className={clsx(
				// ordered ? "list-decimal" : "list-disc",
				className
			)}
		>
			{ children }
		</ListTag>
	)
}

const ListItem = (props: ListItemProps) => {
	const { className, children } = props;

	return <li className={className}>{children}</li>;
}

const OrderedList = (props: ListTypedProps) => <List {...props} ordered />;

const UnorderedList = (props: ListTypedProps) => <List {...props}/>;

interface ListProps { ordered?: boolean, className?: string, children: ReactNode }

interface ListItemProps { className?: string, children: ReactNode }

type ListTypedProps = Omit<ListProps, "ordered">;

List.Ordered = OrderedList;
List.Unordered = UnorderedList;
List.Item = ListItem;

export default List;
export type { ListProps, ListTypedProps }
