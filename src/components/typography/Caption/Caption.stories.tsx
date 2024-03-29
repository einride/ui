import { Meta, StoryObj } from "@storybook/react"
import { Caption } from "./Caption"

const meta = {
  component: Caption,
} satisfies Meta<typeof Caption>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children:
      "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  },
} satisfies Story
