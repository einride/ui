import { Meta, StoryObj } from "@storybook/react"
import { Title2 } from "./Title2"

const meta = {
  component: Title2,
} satisfies Meta<typeof Title2>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children:
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  },
} satisfies Story
