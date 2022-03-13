import Typography from "./Typography";

export default {
	title: "Core/Inputs/Typography",
	component: Typography
}

const Template = (args: typeof Typography) => <Typography {...args}>Typography</Typography>

export const Basic = Template.bind({});

export const Bold = Template.bind({});
Bold.args = {
	weight: "bold"
}

export const Heading1 = Template.bind({});
Heading1.args = {
	type: "h1"
}

export const Heading2 = Template.bind({});
Heading2.args = {
	type: "h2"
}
