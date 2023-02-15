import { joinClasses } from "@/library/utilities";
import { useSupabaseContext, useThemeContext } from "@/library/providers";

import { Link, Box, Container, Show, Flex } from "@/components/core";

import { Rocket } from "../Assets/Rocket";

export const Navbar = (props: NavbarProps) => {
	const { className } = props;

	const { user } = useSupabaseContext();
	const { theme, setTheme } = useThemeContext();

	return (
		<Box className={joinClasses(className)}>
			<Container className="max-w-7xl py-2 mx-auto flex items-center justify-between">
				<Flex className="items-center">
					<Link.Wrapper href="/" className="flex items-center mr-2">
						<Rocket className="text-5xl"/>
					</Link.Wrapper>
					<Flex className="space-x-3">
						<Link href="/music">Music</Link>
						<Link href="/posts">Posts</Link>
						<Link href="/about">About</Link>
						<Show when={!user}>
							<Link href="/auth">
								Account
							</Link>
						</Show>
					</Flex>
				</Flex>
			</Container>
		</Box>
	)
}

export interface NavbarProps {
	className?: string
}
