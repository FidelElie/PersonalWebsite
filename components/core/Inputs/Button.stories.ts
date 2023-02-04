import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

export default {
	title: 'Core/Inputs/Button',
	component: Button,
	tags: ['autodocs']
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Base: Story = {
	args: {
		children: "Primary"
	}
}
