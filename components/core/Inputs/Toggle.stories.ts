import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
	title: "Core/Inputs/Toggle",
	component: Toggle,
}

type Story = StoryObj<typeof Toggle>;

const baseArgs: Story["args"] = { label: "Toggle", className: "w-20" }

export const Unchecked: Story = {
	args: { ...baseArgs, checked: false }
}

export const Checked: Story = {
	args: { ...baseArgs, checked: true }
}

export default meta;
