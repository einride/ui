import { Meta, StoryObj } from "@storybook/react"
import { Example } from "./Example"

const meta = {
  component: Example,
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    background: "secondary",
  },
} satisfies Story
