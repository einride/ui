import { Meta, StoryObj } from "@storybook/react"
import { Title1 } from "./Title1"

const meta = {
  component: Title1,
} satisfies Meta<typeof Title1>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children:
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  },
} satisfies Story
