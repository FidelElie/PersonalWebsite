import type { Meta, StoryObj } from "@storybook/react";

import Icon from "./Icon";

export default {
	title: 'Core/Data/Icon',
	component: Icon,
	tags: ['autodocs']
} as Meta<typeof Icon>;

type Story = StoryObj<typeof Icon>;

export const Base: Story = {
	args: {
		name: "github"
	}
}
