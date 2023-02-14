import type { Meta, StoryObj } from "@storybook/react";

import Link, { LinkProps } from "./Link";

export default {
	title: 'Core/Navigation/Link',
	component: Link
} as Meta<typeof Link>;

type Story = StoryObj<LinkProps>;

const baseArgs: Story["args"] = {
	href: "/",
	children: "Link"
}

export const Base: Story = {
	args: {
		...baseArgs
	}
}

export const Neutral: Story = {
	args: {
		...baseArgs,
		neutral: true,
	}
}

export const Alternate: Story = {
	args: {
		...baseArgs,
		alternate: true
	}
}
