import { expect } from "@storybook/jest"
import { ComponentStoryObj, Meta } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Text } from "./Text"

export default {
  title: "Typography/Text",
  component: Text,
} satisfies Meta<typeof Text>

type Story = ComponentStoryObj<typeof Text>

export const Basic = {
  args: {
    children:
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
    )
    await expect(text).toBeInTheDocument()
  },
} satisfies Story

export const TitleXl = {
  args: {
    ...Basic.args,
    variant: "titleXl",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByRole("heading", {
      level: 2,
      name: "A whole new way to ship. Designed for the majority of freight applications, starting today.",
    })
    await expect(text).toBeInTheDocument()
  },
} satisfies Story

export const Secondary = {
  args: {
    ...Basic.args,
    color: "secondary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText(
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
    )
    await expect(text).toBeInTheDocument()
  },
} satisfies Story
