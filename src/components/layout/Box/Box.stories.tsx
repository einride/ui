import { Meta, StoryObj } from "@storybook/react"
import { Box } from "./Box"

const meta = {
  component: Box,
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Background = {
  args: {
    background: "tertiary",
    borderRadius: "lg",
    height: 10,
    width: 10,
  },
} satisfies Story

export const WithContent = {
  args: {
    background: "positive",
    color: "primaryInverted",
    borderRadius: "lg",
    children: "Content",
    padding: 2,
  },
} satisfies Story
