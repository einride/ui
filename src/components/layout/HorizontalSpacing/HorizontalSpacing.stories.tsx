import { Meta, StoryObj } from "@storybook/react"
import { HorizontalSpacing } from "./HorizontalSpacing"

const meta = {
  component: HorizontalSpacing,
} satisfies Meta<typeof HorizontalSpacing>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {} satisfies Story

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
