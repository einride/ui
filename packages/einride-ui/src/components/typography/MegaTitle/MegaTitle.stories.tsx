import { Meta, StoryObj } from "@storybook/react"
import { MegaTitle } from "./MegaTitle"

const meta = {
  component: MegaTitle,
} satisfies Meta<typeof MegaTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children: "A whole new way to ship.",
  },
} satisfies Story
