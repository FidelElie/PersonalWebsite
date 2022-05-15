import { LightningBoltIcon } from "@heroicons/react/solid";

import { Flex, Box } from "@/components/core";

const Splash = () => {
	return (
		<Flex
			align="center"
			justify="center"
			className="fixed bg-background"
			screen
		>
			<Box className="animate-bounce">
				<LightningBoltIcon className="w-36 h-36 text-light" />
			</Box>
		</Flex>
	)
}
export default Splash;
