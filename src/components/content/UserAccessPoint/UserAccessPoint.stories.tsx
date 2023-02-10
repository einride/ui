import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { UserAccessPoint } from "./UserAccessPoint"

export default {
  title: "Content/UserAccessPoint",
  component: UserAccessPoint,
} satisfies ComponentMeta<typeof UserAccessPoint>

type Story = ComponentStoryObj<typeof UserAccessPoint>

export const User = {
  args: {
    avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
    status: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "User profile picture" })
    await expect(button).toBeInTheDocument()
  },
} satisfies Story

export const NoUser = {
  args: {
    avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
    status: "no-user",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Einride logo" })
    await expect(button).toBeInTheDocument()
  },
} satisfies Story

export const Notification = {
  args: {
    avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
    status: "notification",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "User profile picture" })
    await expect(button).toBeInTheDocument()
  },
} satisfies Story

export const Initials = {
  args: {
    name: "Filip Tammergård",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Filip Tammergård" })
    await expect(button).toBeInTheDocument()
  },
} satisfies Story
