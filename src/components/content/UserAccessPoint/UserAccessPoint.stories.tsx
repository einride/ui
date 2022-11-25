import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { UserAccessPoint } from "./UserAccessPoint"

export default {
  title: "Content/UserAccessPoint",
  component: UserAccessPoint,
} as ComponentMeta<typeof UserAccessPoint>

const Template: ComponentStory<typeof UserAccessPoint> = (args) => <UserAccessPoint {...args} />

export const User = Template.bind({})
User.args = {
  avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
  status: "default",
}
User.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "User profile picture" })
  await expect(button).toBeInTheDocument()
}

export const NoUser = Template.bind({})
NoUser.args = {
  avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
  status: "no-user",
}
NoUser.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Einride logo" })
  await expect(button).toBeInTheDocument()
}

export const Notification = Template.bind({})
Notification.args = {
  avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
  status: "notification",
}
Notification.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "User profile picture" })
  await expect(button).toBeInTheDocument()
}

export const Initials = Template.bind({})
Initials.args = {
  name: "Filip Tammergård",
}
Initials.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Filip Tammergård" })
  await expect(button).toBeInTheDocument()
}
