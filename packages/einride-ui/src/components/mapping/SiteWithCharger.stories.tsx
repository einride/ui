import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteWithCharger from "./siteWithCharger.svg"

const SiteWithCharger = (): JSX.Element => <img src={siteWithCharger} alt="Site with charger" />

const meta = {
  component: SiteWithCharger,
} satisfies Meta<typeof SiteWithCharger>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site with charger/i)
  },
} satisfies Story
