import { ComponentMeta, ComponentStory } from "@storybook/react"
import { StepGauge } from "./StepGauge"

export default {
  title: "Charts/StepGauge",
  component: StepGauge,
} as ComponentMeta<typeof StepGauge>

const Template: ComponentStory<typeof StepGauge> = (args) => <StepGauge {...args} />

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Progress",
  completed: 2,
}
