import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteWithChargerIcon from "./siteWithCharger.svg"

export default {
  title: "Mapping/SiteWithCharger",
} as ComponentMeta<never>

const Template: ComponentStory<never> = () => (
  <img src={siteWithChargerIcon} alt="Site with charger" />
)

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const img = canvas.getByRole("img")
  await expect(img).toHaveAccessibleName(/site with charger/i)
}