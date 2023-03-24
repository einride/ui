import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteHovered from "./siteHovered.svg"

const SiteHovered = (): JSX.Element => <img src={siteHovered} alt="Site" />

const meta = {
  component: SiteHovered,
} satisfies Meta<typeof SiteHovered>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site/i)
  },
} satisfies Story