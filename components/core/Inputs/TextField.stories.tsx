import TextField from "./TextField";

import { AtSymbolIcon } from "@heroicons/react/solid";

export default {
	title: "Core/Inputs/Text Field",
	component: TextField
}

const Template = (args: typeof TextField) => <TextField
	label="Text Field" placeholder="Text Field" {...args}/>

export const Basic = Template.bind({});

export const Icon = Template.bind({});
Icon.args = {
	icon: AtSymbolIcon
}
