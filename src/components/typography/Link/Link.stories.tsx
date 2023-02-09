import { expect } from "@storybook/jest"
import { ComponentStoryObj, Meta } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Link } from "./Link"

export default {
  title: "Typography/Link",
  component: Link,
} satisfies Meta<typeof Link>

type Story = ComponentStoryObj<typeof Link>

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
