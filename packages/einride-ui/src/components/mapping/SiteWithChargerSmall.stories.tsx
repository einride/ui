import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteWithChargerSmall from "./siteWithChargerSmall.svg"

const SiteWithChargerSmall = (): JSX.Element => (
  <img src={siteWithChargerSmall} alt="Site with charger" />
)

const meta = {
  component: SiteWithChargerSmall,
} satisfies Meta<typeof SiteWithChargerSmall>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site with charger/i)
  },
} satisfies Story
