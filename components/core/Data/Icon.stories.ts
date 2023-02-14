import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "./Icon";

import { joinClasses } from "@/library/utilities";

export default {
	title: 'Core/Data/Icon',
	component: Icon,
	tags: ['autodocs']
} as Meta<typeof Icon>;

type Story = StoryObj<typeof Icon>;

const sharedClassName = "text-5xl";

export const Base: Story = {
	args: {
		name: "github",
		color: "gray",
		className: joinClasses("dark:text-white", sharedClassName)
	}
}

export const Color: Story = {
	args: {
		name: "font-color",
		color: "primary",
		className: sharedClassName
	}
}
