import { Story, Meta } from "@storybook/react";

import Button, { ButtonProps, LinkButtonProps } from "./Button";

export default {
	title: "Core/Inputs/Button",
	component: Button
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;
const LinkTemplate: Story<LinkButtonProps> = (args) => <Button.Link {...args}>Button</Button.Link>;

export const Primary = Template.bind({});

export const LinkButton = LinkTemplate.bind({});

export const LinkButtonAlternate = LinkTemplate.bind({});
LinkButtonAlternate.args = {
	alt: true
}
