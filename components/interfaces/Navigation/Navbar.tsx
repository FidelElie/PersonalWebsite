import Link from "next/link";

import { Icon, Box, Container, Heading, Flex } from "@/components/core";
import { ThemeToggle } from "../Theme";

export const Navbar = () => {
	return (
		<Box
			as="nav"
			className="border-b w-full bg-white dark:bg-gray-700 dark:border-white dark:border-0"
		>
			<Container
				className="mx-auto container max-w-4xl px-5 py-2.5 flex items-center justify-between md:px-0"
			>
				<Link href="/" className="flex items-center text-tertiary w-min dark:text-gray-50">
					<Box className="w-3 h-3 mr-2 rounded-full bg-primary"></Box>
					<Heading.One className="tracking-tighter font-light whitespace-nowrap">
						Fidel Elie
					</Heading.One>
				</Link>
				<Flex className="items-center justify-end space-x-3">
					<ThemeToggle initialPlacement="bottom-end"/>
					<button
						className=""
					>
						<Icon name="menu-5-line" className="text-gray-800 text-xl dark:text-gray-50" />
					</button>
				</Flex>
			</Container>
		</Box>
	)
}
