import { useState } from "react";

import { joinClasses } from "@/library/utilities";
import { useSupabaseContext, useThemeContext } from "@/library/providers";

import { Link, Box, Container, Flex, Icon, Button } from "@/components/core";

import { Rocket } from "../Assets/Rocket";

export const Navbar = (props: NavbarProps) => {
	const { className } = props;

	const [isOpen, setIsOpen] = useState(false);

	const { user } = useSupabaseContext();
	const { theme, setTheme } = useThemeContext();

	return (
		<Box as="nav" className={joinClasses(isOpen && "bg-gray", className)}>
			<Container className="max-w-7xl py-3 px-5 mx-auto flex items-center justify-between md:px-0">
				<Flex className="items-center w-full justify-between">
					<Button onClick={() => setIsOpen(openState => !openState)}>
						<Icon name={isOpen ? "close" : "menu"} className="text-gray text-xl dark:text-white"/>
					</Button>
					<Link.Wrapper href="/" className="flex items-center mr-2">
						<Rocket className="text-5xl"/>
					</Link.Wrapper>
					<Icon name="search-2" type="line" className="text-gray text-xl dark:text-white" />
				</Flex>
			</Container>
		</Box>
	)
}

export interface NavbarProps {
	className?: string
}
