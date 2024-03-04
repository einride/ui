import { Meta, StoryObj } from "@storybook/react"
import { VerticalSpacing } from "./VerticalSpacing"

const meta = {
  component: VerticalSpacing,
} satisfies Meta<typeof VerticalSpacing>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {} satisfies Story

export const ExtraSmall = {
  args: {
    size: "xs",
  },
} satisfies Story

export const Small = {
  args: {
    size: "sm",
  },
} satisfies Story

export const Medium = {
  args: {
    size: "md",
  },
} satisfies Story

export const Large = {
  args: {
    size: "lg",
  },
} satisfies Story

export const ExtraLarge = {
  args: {
    size: "xl",
  },
} satisfies Story
