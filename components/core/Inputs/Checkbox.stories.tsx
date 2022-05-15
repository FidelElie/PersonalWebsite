import { Story, Meta } from "@storybook/react";

import Checkbox, { CheckboxProps } from "./Checkbox";

export default {
	title: "Core/Inputs/Checkbox",
	component: Checkbox
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox label="Checkbox" {...args} />;

export const Basic = Template.bind({});

export const Checked = Template.bind({});
Checked.args = {
	checked: true
}
