import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import site from "./site.svg"

const Site = (): JSX.Element => <img src={site} alt="Site" />

const meta = {
  component: Site,
} satisfies Meta<typeof Site>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site/i)
  },
} satisfies Story
