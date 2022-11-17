import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import chargerSmallIcon from "./chargerSmall.svg"

export default {
  title: "Mapping/ChargerSmall",
} as ComponentMeta<never>

const Template: ComponentStory<never> = () => <img src={chargerSmallIcon} alt="Small charger" />

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const img = canvas.getByRole("img")
  await expect(img).toHaveAccessibleName(/small charger/i)
}
