import type { Meta, StoryObj } from "@storybook/react";

import TextField from "./TextField";

export default {
	title: 'Core/Inputs/TextField',
	component: TextField
} as Meta<typeof TextField>;

type Story = StoryObj<typeof TextField>;

const baseArgs: Story["args"] = {
	placeholder: "Text Field Placeholder"
}

export const Base: Story = {
	args: {
		...baseArgs
	}
}
