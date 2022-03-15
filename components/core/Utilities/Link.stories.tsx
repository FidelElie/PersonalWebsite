import Link from "./Link";

export default {
	title: "Core/Utilities/Link",
	component: Link
}

const Template = (args: typeof Link) => <Link href="#" {...args}>Link</Link>

export const Basic = Template.bind({});

export const Alternate = Template.bind({});
Alternate.args = {
	alt: true
}
