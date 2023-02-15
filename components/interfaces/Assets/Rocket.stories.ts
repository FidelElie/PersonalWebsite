import type { Meta, StoryObj } from "@storybook/react";

import { Rocket }from "./Rocket";

export default {
	title: 'Interfaces/Rocket',
	component: Rocket
} as Meta<typeof Rocket>;

type Story = StoryObj<typeof Rocket>;

export const Base: Story = {
	args: {
		className: "text-9xl"
	}
}
