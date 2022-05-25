import React from "react";
import { Story, Meta } from "@storybook/react";
import Heading, { HeadingProps } from "./Heading";

export default {
	title: "Core/Data/Heading",
	component: Heading
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args}>Heading</Heading>;

export const Basic = Template.bind({});
