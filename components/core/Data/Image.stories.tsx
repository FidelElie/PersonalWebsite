import React from "react";
import { Story, Meta } from "@storybook/react";

import Image, { ImageProps } from "./Image";

export default {
	title: "Core/Data/Image",
	component: Image
} as Meta;

const Template: Story<ImageProps> = (args) => <Image {...args}>Image</Image>;

export const Basic = Template.bind({});
