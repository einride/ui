import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteSmall from "./siteSmall.svg"

const SiteSmall = (): JSX.Element => <img src={siteSmall} alt="Site" />

export default {
  title: "Mapping/SiteSmall",
  component: SiteSmall,
} satisfies ComponentMeta<typeof SiteSmall>

type Story = ComponentStoryObj<typeof SiteSmall>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site/i)
  },
} satisfies Story
