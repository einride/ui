import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import conventionalTruck from "./conventionalTruck.svg"

const ConventionalTruck = (): JSX.Element => (
  <img src={conventionalTruck} alt="Conventional truck" />
)

const meta = {
  component: ConventionalTruck,
} satisfies Meta<typeof ConventionalTruck>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/conventional truck/i)
  },
} satisfies Story
