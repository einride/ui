import { Meta, StoryObj } from "@storybook/react"
import { Title3 } from "./Title3"

const meta = {
  component: Title3,
} satisfies Meta<typeof Title3>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children:
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  },
} satisfies Story
