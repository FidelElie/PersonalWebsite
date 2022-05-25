import React from "react";
import { Story, Meta } from "@storybook/react";

import Image, { ImageProps } from "./Image";

export default {
	title: "Core/Data/Image",
	component: Image
} as Meta;

const Template: Story<Omit<ImageProps, "src">> = (args) => (
	<Image src="" {...args}/>
);

export const Basic = Template.bind({});
