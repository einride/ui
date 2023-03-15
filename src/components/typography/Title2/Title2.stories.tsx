import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Title2 } from "./Title2"

export default {
  title: "Typography/Title2",
  component: Title2,
} satisfies ComponentMeta<typeof Title2>

type Story = ComponentStoryObj<typeof Title2>

export const Default = {
  args: {
    children:
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  },
} satisfies Story
