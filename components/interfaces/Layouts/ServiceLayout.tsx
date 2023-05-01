import type { ReactNode } from "react";

import { Page, Container, Box, Heading, Copy } from "@/components/core"

export const ServiceLayout = (props: ServiceLayoutProps) => {
	const { title, heading, description } = props;

	return (
		<Page
			title={title}
			className="items-center justify-center w-full"
		>
			<Container className="flex-grow flex items-center justify-center">
				<Box className="text-left">
					<Heading className="text-5xl mb-4 tracking-tight" underline>
						{ heading }
					</Heading>
					<Copy className="text-lg">{ description }</Copy>
				</Box>
			</Container>
		</Page>
	)
}

export interface ServiceLayoutProps {
	title: string;
	heading: string;
	description: ReactNode;
}
