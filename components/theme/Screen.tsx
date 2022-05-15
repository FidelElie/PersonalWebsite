import { ReactNode } from "react";

import { Flex } from "@/components/core";

const Screen = (props: LayoutProps) => {
	const { children } = props;
	return (
		<Flex.Col
			justify="center"
			align="center"
			className="w-screen min-h-screen"
		>
			{children}
		</Flex.Col>
	)
}

interface LayoutProps {
	children: ReactNode
}

export default Screen;
