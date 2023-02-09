import { expect } from "@storybook/jest"
import { ComponentStoryObj, Meta } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteHovered from "./siteHovered.svg"

const SiteHovered = (): JSX.Element => <img src={siteHovered} alt="Site" />

export default {
  title: "Mapping/SiteHovered",
  component: SiteHovered,
} satisfies Meta<typeof SiteHovered>

type Story = ComponentStoryObj<typeof SiteHovered>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site/i)
  },
} satisfies Story
