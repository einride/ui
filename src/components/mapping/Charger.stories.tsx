import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import chargerIcon from "./charger.svg"

export default {
  title: "Mapping/Charger",
} as ComponentMeta<never>

const Template: ComponentStory<never> = () => <img src={chargerIcon} alt="Charger" />

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const img = canvas.getByRole("img")
  await expect(img).toHaveAccessibleName(/charger/i)
}
