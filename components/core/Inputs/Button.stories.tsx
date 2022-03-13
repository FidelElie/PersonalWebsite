import Button from "./Button";

export default {
	title: "Core/Inputs/Button",
	component: Button
}

const Template = (args: typeof Button) => <Button {...args}>Button</Button>

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
	theme: "secondary",
}

export const Tertiary = Template.bind({});
Tertiary.args = {
	theme: "tertiary",
}

export const Small = Template.bind({});
Small.args = {
	size: "small"
}

export const Large = Template.bind({});
Large.args = {
	size: "large"
}
