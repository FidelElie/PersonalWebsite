import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

export default {
	title: 'Core/Inputs/Button',
	component: Button
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Unstyled: Story = {
	args: {
		children: "Base Button"
	}
}

export const Primary: Story = {
	args: {
		theme: "Primary",
		children: "Primary"
	}
}

export const Secondary: Story = {
	args: {
		theme: "Secondary",
		children: "Secondary"
	}
}

export const Tertiary: Story = {
	args: {
		theme: "Tertiary",
		children: "Tertiary"
	}
}


export const PrimaryAlternate: Story = {
	args: {
		theme: "Primary",
		alternate: true,
		children: "Primary Alternate"
	}
}

export const SecondaryAlternate: Story = {
	args: {
		theme: "Secondary",
		alternate: true,
		children: "Secondary Alternate"
	}
}

export const TertiaryAlternate: Story = {
	args: {
		theme: "Tertiary",
		alternate: true,
		children: "Tertiary Alternate"
	}
}

export const Disabled: Story = {
	args: {
		theme: "Primary",
		disabled: true,
		children: "Disabled Button"
	}
}
