import { Box, Copy, Heading } from "@/components/core"

export const AboutBlock = () => {
	return (
		<Box>
			<Heading.Two className="mb-1 uppercase text-secondary" light>About Me</Heading.Two>
			<Copy className="text-sm leading-none font-light tracking-tight text-white">
				I am a developer who is always trying to push myself to new limits. Exploring new and interesting approaches, optimisations and designs. I am constantly pushing the boundaries of what I am capable of.
			</Copy>
		</Box>
	)
}
