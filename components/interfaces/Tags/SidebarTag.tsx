import { ReactNode } from "react";

import { Copy, Flex } from "@/components/core";

export const SidebarTag = (props: { children: ReactNode }) => {
	const { children } = props;

	return (
		<Flex className="py-0.5 px-1 border border-gray-600 rounded w-min">
			<Copy className="text-xs text-secondary whitespace-nowrap" light>{children}</Copy>
		</Flex>
	)
}
