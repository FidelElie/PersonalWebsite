import { Box, Copy, Heading } from "@/components/core"

export const About = () => {
	return (
		<Box>
			<Heading.Two className="mb-1 uppercase text-white">About Me</Heading.Two>
			<Copy className="text-sm text-white leading-none font-light tracking-tight">
				I am a developer who is always trying to push myself to new limits. Exploring new and interesting approaches, optimisations and designs. I am constantly pushing the boundaries of what I can do.
			</Copy>
		</Box>
	)
}
