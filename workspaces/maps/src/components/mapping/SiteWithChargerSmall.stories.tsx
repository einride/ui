import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteWithChargerSmall from "./siteWithChargerSmall.svg"

const SiteWithChargerSmall = (): JSX.Element => (
  <img src={siteWithChargerSmall} alt="Site with charger" />
)

export default {
  title: "Mapping/SiteWithChargerSmall",
  component: SiteWithChargerSmall,
} satisfies ComponentMeta<typeof SiteWithChargerSmall>

type Story = ComponentStoryObj<typeof SiteWithChargerSmall>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site with charger/i)
  },
} satisfies Story
