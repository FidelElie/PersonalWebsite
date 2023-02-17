import { useState } from "react";

import { joinClasses } from "@/library/utilities";
import { useLogout } from "@/library/api/client";
import { useSupabaseContext, useThemeContext } from "@/library/providers";

import { Link, Box, Container, Flex, Icon, Button, Show, Text } from "@/components/core";

import { Rocket } from "../Assets/Rocket";

export const Navbar = (props: NavbarProps) => {
	const { className } = props;

	const [isOpen, setIsOpen] = useState(false);

	const logout = useLogout();
	const { user } = useSupabaseContext();
	const { theme, setTheme } = useThemeContext();

	return (
		<Box
			as="nav"
			className={joinClasses(
				"transition-all space-y-2",
				isOpen ? "bg-gray" : "bg-white dark:bg-gray-dark",
				className
			)
		}>
			<Container
				className="max-w-4xl py-3 px-5 mx-auto space-y-2 flex flex-col justify-between md:px-0"
			>
				<Flex className="items-center w-full justify-between">
					<Link href="/" className="mr-2 flex items-center">
						<Rocket className="text-4xl -ml-2 mr-1" />
						<Text.Inline className="">Fidel Elie</Text.Inline>
					</Link>
					<Flex className="items-center space-x-3">
						<Button onClick={() => setIsOpen(openState => !openState)}>
							<Icon
								name={isOpen ? "close-circle" : "menu-4"}
								className="text-gray text-2xl dark:text-white"
							/>
						</Button>
					</Flex>
				</Flex>
				<Show when={isOpen}>
					<Flex className="w-full">
						<Show when={user}>
							<Button className="text-white py-1" onClick={() => logout.mutate()} theme="Primary">
								Sign out
							</Button>
						</Show>
					</Flex>
				</Show>
			</Container>
		</Box>
	)
}

export interface NavbarProps {
	className?: string
}
