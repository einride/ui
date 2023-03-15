import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Title3 } from "./Title3"

export default {
  title: "Typography/Title3",
  component: Title3,
} satisfies ComponentMeta<typeof Title3>

type Story = ComponentStoryObj<typeof Title3>

export const Default = {
  args: {
    children:
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  },
} satisfies Story
