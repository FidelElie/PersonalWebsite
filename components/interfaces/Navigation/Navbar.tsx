import { joinClasses } from "@/library/utilities";
import { useSupabaseContext, useThemeContext } from "@/library/providers";

import { Link, Flex, Box, Container } from "@/components/core";

const Navbar = (props: NavbarProps) => {
	const { className } = props;

	const { user } = useSupabaseContext();
	const { theme, setTheme } = useThemeContext();

	return (
		<Box className={joinClasses(className)}>
			<Container className="max-w-4xl py-4 mx-auto flex items-center">
				<div className="flex space-x-3 flex-grow">
				</div>
			</Container>
		</Box>
	)
}

export interface NavbarProps {
	className?: string
}

export default Navbar;

