import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import conventionalTruckIcon from "./conventionalTruck.svg"

export default {
  title: "Mapping/ConventionalTruck",
} as ComponentMeta<never>

const Template: ComponentStory<never> = () => (
  <img src={conventionalTruckIcon} alt="Conventional truck" />
)

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const img = canvas.getByRole("img")
  await expect(img).toHaveAccessibleName(/conventional truck/i)
}
