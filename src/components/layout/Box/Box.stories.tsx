import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Box } from "./Box"

export default {
  title: "Layout/Box",
  component: Box,
} satisfies ComponentMeta<typeof Box>

type Story = ComponentStoryObj<typeof Box>

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
