import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Logo } from "./Logo"

export default {
  title: "Content/Logo",
  component: Logo,
} satisfies ComponentMeta<typeof Logo>

type Story = ComponentStoryObj<typeof Logo>

export const Default = {
  args: {},
} satisfies Story

export const Small = {
  args: {
    size: "sm",
  },
} satisfies Story

export const Large = {
  args: {
    size: "lg",
  },
} satisfies Story
