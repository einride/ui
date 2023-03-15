import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { HorizontalSpacing } from "./HorizontalSpacing"

export default {
  title: "Layout/HorizontalSpacing",
  component: HorizontalSpacing,
} satisfies ComponentMeta<typeof HorizontalSpacing>

type Story = ComponentStoryObj<typeof HorizontalSpacing>

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
