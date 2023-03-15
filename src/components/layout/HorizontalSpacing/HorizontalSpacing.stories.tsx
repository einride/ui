import { Meta, StoryObj } from "@storybook/react"
import { HorizontalSpacing } from "./HorizontalSpacing"

const meta = {
  title: "Layout/HorizontalSpacing",
  component: HorizontalSpacing,
} satisfies Meta<typeof HorizontalSpacing>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story

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
