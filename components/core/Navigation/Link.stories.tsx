import { Story, Meta } from "@storybook/react";

import Link, { LinkProps } from "./Link";

export default {
	title: "Core/Utilities/Link",
	component: Link
} as Meta;

const Template: Story<LinkProps> = (args) => <Link href="#" {...args}>Link</Link>

export const Basic = Template.bind({});

export const Alternate = Template.bind({});
Alternate.args = {
	alt: true
}
