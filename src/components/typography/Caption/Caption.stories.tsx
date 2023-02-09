import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Caption } from "./Caption"

export default {
  title: "Typography/Caption",
  component: Caption,
} satisfies ComponentMeta<typeof Caption>

type Story = ComponentStoryObj<typeof Caption>

export const Default = {
  args: {
    children:
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  },
} satisfies Story
