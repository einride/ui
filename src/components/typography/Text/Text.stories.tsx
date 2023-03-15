import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { contentColors, fonts } from "../../../lib/theme/types"
import { Text } from "./Text"

const meta = {
  title: "Typography/Text",
  component: Text,
  argTypes: {
    color: {
      options: contentColors,
    },
    font: {
      options: fonts,
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

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
