import type { ReactNode } from "react";
import clsx from "clsx";

import type { HeadingLevels } from "@/library/integrations/notion";

import { Box, Text, Heading, List } from "../../core";

const Prose = {
	image: ({ content }: { content: string }) => (
		<img src={content} className="mb-5" alt=""/>
	),
	section: (
		{ contents, content, level }: { contents: ReactNode, content: string, level: HeadingLevels }
	) => (
		<Box.Section className={clsx(
			"last:mb-0",
			level === 1 && "mb-5",
			level === 2 && "mb-3",
			level === 3 && "mb-1.5"
		)}>
			<Heading
				className={clsx(
					"tracking-tighter text-white underline decoration-2 underline-offset-4",
					level === 1 && "decoration-primary text-2xl md:text-3xl mb-2",
					level === 2 && "decoration-accent1 text-xl md:text-2xl mb-1.5",
					level === 3 && "decoration-accent2 text-lg md:text-xl mb-1"
				)}
				level={level + 1 as 2 | 3 | 4}
			>
				{content}
			</Heading>
			{contents}
		</Box.Section>
	),
	paragraph: ({ content }: { content: string }) => (
		<Text className="text-white text-sm tracking-tighter font-light mb-3 md:text-base">
			{content}
		</Text>
	),
	list: ({ contents, ordered }: { contents: string[], ordered: boolean }) => (
		<List ordered={ordered} className="text-white space-y-1">
			{
				contents.map((content, index) => (
					<List.Item className="text-sm md:text-base" key={index}>{content}</List.Item>
				))
			}
		</List>
	)
} as const

export default Prose;
