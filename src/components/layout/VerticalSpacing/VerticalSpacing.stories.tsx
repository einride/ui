import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { VerticalSpacing } from "./VerticalSpacing"

export default {
  title: "Layout/VerticalSpacing",
  component: VerticalSpacing,
} satisfies ComponentMeta<typeof VerticalSpacing>

type Story = ComponentStoryObj<typeof VerticalSpacing>

export const Default = {} satisfies Story

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
