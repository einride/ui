import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteSelected from "./siteSelected.svg"

const SiteSelected = (): JSX.Element => <img src={siteSelected} alt="Site" />

const meta = {
  title: "Mapping/SiteSelected",
  component: SiteSelected,
} satisfies Meta<typeof SiteSelected>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site/i)
  },
} satisfies Story
