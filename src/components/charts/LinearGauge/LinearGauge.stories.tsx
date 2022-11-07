import { ComponentMeta, ComponentStory } from "@storybook/react"
import { LinearGauge } from "./LinearGauge"

export default {
  title: "Charts/LinearGauge",
  component: LinearGauge,
} as ComponentMeta<typeof LinearGauge>

const Template: ComponentStory<typeof LinearGauge> = (args) => <LinearGauge {...args} />

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Progress",
  value: 40,
}
