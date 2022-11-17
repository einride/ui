import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteSmallIcon from "./siteSmall.svg"

export default {
  title: "Mapping/SiteSmall",
} as ComponentMeta<never>

const Template: ComponentStory<never> = () => <img src={siteSmallIcon} alt="Small site" />

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const img = canvas.getByRole("img")
  await expect(img).toHaveAccessibleName(/small site/i)
}
