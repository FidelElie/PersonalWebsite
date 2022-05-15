import { LightningBoltIcon } from "@heroicons/react/solid";

import { Link, Flex } from "@/components/core";

const Navbar = (props: NavbarProps) => {
	return (
		<Flex.Row
			as="nav"
			align="center"
			className="fixed px-3 py-3 top-0 w-full"
		>
			<Flex.Row
				align="center"
				className="space-x-2"
			>
				<Link href="/">
					<LightningBoltIcon className="w-9 h-9 text-light cursor-pointer transition-colors duration-200 hover:fill-cyan-600" />
				</Link>
				<Link href="/">Book of Elie</Link>
			</Flex.Row>
		</Flex.Row>
	)
}

interface NavbarProps {
}

export default Navbar;
