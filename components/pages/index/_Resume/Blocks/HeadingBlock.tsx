import { Box, Heading } from "@/components/core";

export const HeadingBlock = () => {
	return (
		<Box>
			<Heading.One className="text-4xl text-secondary font-bold uppercase" light>
				Fidel Pierre Elie
			</Heading.One>
			<Heading.Two className="text-lg text-primary" light>Software Developer</Heading.Two>
		</Box>
	)
}
