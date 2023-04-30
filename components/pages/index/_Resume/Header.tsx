import { useState } from "react"
import { Box, Heading as CoreHeading } from "@/components/core";

export const Heading = () => {
	const [name, setName] = useState("Fidel Pierre Elie");
	const [title, setTitle] = useState("Developer");

	return (
		<Box>
			<CoreHeading.One
				className="text-4xl tracking-tighter text-secondary font-bold dark:text-white"
			>
				{name}
			</CoreHeading.One>
			<CoreHeading.Two className="text-lg text-primary">
				{title}
			</CoreHeading.Two>
			{/* <h1 className="text-4xl tracking-tighter text-secondary font-bold dark:text-white"></h1>
			<span className="text-lg text-primary">Developer</span> */}
		</Box>
	)
}
