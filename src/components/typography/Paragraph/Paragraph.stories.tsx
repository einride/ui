import { Meta, StoryObj } from "@storybook/react"
import { Paragraph } from "./Paragraph"

const meta = {
  component: Paragraph,
} satisfies Meta<typeof Paragraph>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    children:
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  },
} satisfies Story
