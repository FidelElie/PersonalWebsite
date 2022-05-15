import { Story, Meta } from "@storybook/react";
import { AtSymbolIcon } from "@heroicons/react/solid";

import TextField, { TextFieldProps } from "./TextField";

export default {
	title: "Core/Inputs/Text Field",
	component: TextField
} as Meta

const Template: Story<TextFieldProps> = (args: typeof TextField) => (
	<TextField label="Text Field" placeholder="Text Field" {...args} />
);

export const Basic = Template.bind({});
export const Icon = Template.bind({});
Icon.args = {
	icon: AtSymbolIcon
}
