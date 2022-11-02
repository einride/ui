import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Weight } from "./Weight"

export default {
  title: "Format/Weight",
  component: Weight,
} as ComponentMeta<typeof Weight>

const Template: ComponentStory<typeof Weight> = (args) => <Weight {...args} />

export const Metric = Template.bind({})
Metric.args = {
  kilograms: 123456.789,
  locales: "en-US",
  unit: "metric",
}
Metric.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const weight = canvas.getByText("123,456.8 kg")
  expect(weight).toBeInTheDocument()
}

export const Imperial = Template.bind({})
Imperial.args = {
  kilograms: 123456.789,
  locales: "en-US",
  unit: "imperial",
}
Imperial.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const weight = canvas.getByText("272,175.6 lb")
  expect(weight).toBeInTheDocument()
}

export const ImperialInSwedish = Template.bind({})
ImperialInSwedish.args = {
  kilograms: 123456.789,
  locales: "sv-SE",
  unit: "imperial",
}
ImperialInSwedish.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const unit = canvas.getByText("272 175,6 pund")
  expect(unit).toBeInTheDocument()
}
