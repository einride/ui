import { ComponentStoryObj, Meta } from "@storybook/react"
import { Title1 } from "./Title1"

export default {
  title: "Typography/Title1",
  component: Title1,
} satisfies Meta<typeof Title1>

type Story = ComponentStoryObj<typeof Title1>

export const Default = {
  args: {
    children:
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  },
} satisfies Story
