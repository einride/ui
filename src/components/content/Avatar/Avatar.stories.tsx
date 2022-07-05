import { Story } from "@storybook/react/types-6-0"
import { Avatar, AvatarProps } from "./Avatar"

export default {
  title: "Content/Avatar",
  component: Avatar,
}

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />

export const Default = Template.bind({})
Default.args = {
  alt: "User profile picture",
  src: "https://source.unsplash.com/e5eDHbmHprg/250x250",
}

export const Circle = Template.bind({})
Circle.args = {
  ...Default.args,
  radius: "full",
}

export const Square = Template.bind({})
Square.args = {
  ...Default.args,
  radius: "sm",
}

export const Initials = Template.bind({})
Initials.args = {
  name: "Filip Tammergård",
}
