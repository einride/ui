import { ComponentMeta, ComponentStory } from "@storybook/react"
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

export const Imperial = Template.bind({})
Imperial.args = {
  locales: "en-US",
  unitSystem: "imperial",
}
