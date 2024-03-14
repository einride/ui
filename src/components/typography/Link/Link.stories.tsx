import { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Link } from "./Link"

const meta = {
  component: Link,
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    as: "a",
    children: "A whole new way to ship.",
    href: "https://einride.tech",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole("link", { name: "A whole new way to ship." })
    await expect(link).not.toBeDisabled()
  },
} satisfies Story
