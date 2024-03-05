import { Meta, StoryObj } from "@storybook/react"
import { Box } from "./Box"

const meta = {
  component: Box,
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    blockSize: "xl",
    inlineSize: 16,
    background: "tertiary",
    borderRadius: "lg",
  },
} satisfies Story

/** Think of `<Box>` as a `<div>` with some extra supercharging. It accepts `children` just as expected. */
export const WithContent = {
  args: {
    background: "positive",
    color: "primaryInverted",
    borderRadius: "lg",
    children: "Content",
    padding: 2,
  },
} satisfies Story
