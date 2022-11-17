import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import siteIcon from "./site.svg"

export default {
  title: "Mapping/Site",
} as ComponentMeta<never>

const Template: ComponentStory<never> = () => <img src={siteIcon} alt="Site" />

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const img = canvas.getByRole("img")
  await expect(img).toHaveAccessibleName(/site/i)
}
