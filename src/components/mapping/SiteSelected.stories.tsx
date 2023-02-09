import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteSelected from "./siteSelected.svg"

const SiteSelected = (): JSX.Element => <img src={siteSelected} alt="Site" />

export default {
  title: "Mapping/SiteSelected",
  component: SiteSelected,
} satisfies ComponentMeta<typeof SiteSelected>

type Story = ComponentStoryObj<typeof SiteSelected>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site/i)
  },
} satisfies Story
