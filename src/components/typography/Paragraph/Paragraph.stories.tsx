import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Paragraph } from "./Paragraph"

export default {
  title: "Typography/Paragraph",
  component: Paragraph,
} satisfies ComponentMeta<typeof Paragraph>

type Story = ComponentStoryObj<typeof Paragraph>

export const Default = {
  args: {
    children:
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  },
} satisfies Story
