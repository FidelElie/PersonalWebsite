import Checkbox from "./Checkbox";

export default {
	title: "Core/Inputs/Checkbox",
	component: Checkbox
}

const Template = (args: typeof Checkbox) => <Checkbox label="Checkbox" {...args}/>

export const Basic = Template.bind({});

export const Checked = Template.bind({});
Checked.args = {
	checked: true
}
