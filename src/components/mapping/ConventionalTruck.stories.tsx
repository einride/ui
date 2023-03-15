import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import conventionalTruck from "./conventionalTruck.svg"

const ConventionalTruck = (): JSX.Element => (
  <img src={conventionalTruck} alt="Conventional truck" />
)

export default {
  title: "Mapping/ConventionalTruck",
  component: ConventionalTruck,
} satisfies ComponentMeta<typeof ConventionalTruck>

type Story = ComponentStoryObj<typeof ConventionalTruck>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/conventional truck/i)
  },
} satisfies Story
