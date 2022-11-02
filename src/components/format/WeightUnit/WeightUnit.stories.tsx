import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { WeightUnit } from "./WeightUnit"

export default {
  title: "Format/WeightUnit",
  component: WeightUnit,
} as ComponentMeta<typeof WeightUnit>

const Template: ComponentStory<typeof WeightUnit> = (args) => <WeightUnit {...args} />

export const Metric = Template.bind({})
Metric.args = {
  locales: "en-US",
  unitSystem: "metric",
}
Metric.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const unit = canvas.getByText("kg")
  expect(unit).toBeInTheDocument()
}

export const Imperial = Template.bind({})
Imperial.args = {
  locales: "en-US",
  unitSystem: "imperial",
}
Imperial.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const unit = canvas.getByText("lb")
  expect(unit).toBeInTheDocument()
}

export const ImperialInSwedish = Template.bind({})
ImperialInSwedish.args = {
  locales: "sv-SE",
  unitSystem: "imperial",
}
ImperialInSwedish.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const unit = canvas.getByText("pund")
  expect(unit).toBeInTheDocument()
}
