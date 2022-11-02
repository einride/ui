import { ComponentMeta, ComponentStory } from "@storybook/react"
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

export const Imperial = Template.bind({})
Imperial.args = {
  kilograms: 123456.789,
  locales: "en-US",
  unit: "imperial",
}
