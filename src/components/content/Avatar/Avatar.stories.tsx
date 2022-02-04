import { Story } from "@storybook/react/types-6-0"
import * as React from "react"
import { Avatar, AvatarProps } from "./Avatar"

export default {
  title: "Content/Avatar",
  component: Avatar,
  argTypes: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=84%3A98",
    },
  },
}

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />

export const Medium = Template.bind({})
Medium.args = {
  alt: "User profile picture",
  src: "https://source.unsplash.com/e5eDHbmHprg/250x250",
}

export const Large = Template.bind({})
Large.args = {
  alt: "User profile picture",
  size: "lg",
  src: "https://source.unsplash.com/e5eDHbmHprg/250x250",
}
