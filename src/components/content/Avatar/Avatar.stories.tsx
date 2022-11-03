import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Avatar } from "./Avatar"

export default {
  title: "Content/Avatar",
  component: Avatar,
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Default = Template.bind({})
Default.args = {
  alt: "Profile picture",
  src: "https://source.unsplash.com/e5eDHbmHprg/250x250",
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const avatar = canvas.getByAltText("Profile picture")
  expect(avatar).toBeInTheDocument()
}

export const Circle = Template.bind({})
Circle.args = {
  ...Default.args,
  radius: "full",
}
Circle.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const avatar = canvas.getByAltText("Profile picture")
  expect(avatar).toBeInTheDocument()
}

export const Square = Template.bind({})
Square.args = {
  ...Default.args,
  radius: "sm",
}
Square.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const avatar = canvas.getByAltText("Profile picture")
  expect(avatar).toBeInTheDocument()
}

export const Initials = Template.bind({})
Initials.args = {
  name: "Filip Tammergård",
}
Initials.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const initials = canvas.getByText("FT")
  expect(initials).toBeInTheDocument()
}
