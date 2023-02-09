import { expect } from "@storybook/jest"
import { ComponentStoryObj, Meta } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteWithCharger from "./siteWithCharger.svg"

const SiteWithCharger = (): JSX.Element => <img src={siteWithCharger} alt="Site with charger" />

export default {
  title: "Mapping/SiteWithCharger",
  component: SiteWithCharger,
} satisfies Meta<typeof SiteWithCharger>

type Story = ComponentStoryObj<typeof SiteWithCharger>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site with charger/i)
  },
} satisfies Story
