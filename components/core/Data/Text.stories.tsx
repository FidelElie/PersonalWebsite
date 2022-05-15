import React from "react";
import { Story, Meta } from "@storybook/react";
import Text, { TextProps } from "./Text";

export default {
	title: "Core/Data/Text",
	component: Text
} as Meta;

const Template: Story<TextProps> = (args) => <Text {...args}>Text</Text>;

export const Basic = Template.bind({});

export const Small = Template.bind({});
Small.args = {
	size: "sm"
}

export const Large = Template.bind({});
Large.args = {
	size: "lg"
}

export const Color = Template.bind({});
Color.args = {
	color: "blue"
}

export const Bold = Template.bind({});
Bold.args = {
	as: "b"
}

export const Italic = Template.bind({});
Italic.args = {
	as: "i"
}

export const Span = Template.bind({});
Span.args = {
	as: "span"
}
