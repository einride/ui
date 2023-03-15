import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteSmall from "./siteSmall.svg"

const SiteSmall = (): JSX.Element => <img src={siteSmall} alt="Site" />

const meta = {
  title: "Mapping/SiteSmall",
  component: SiteSmall,
} satisfies Meta<typeof SiteSmall>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site/i)
  },
} satisfies Story
