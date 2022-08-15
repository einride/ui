import { Story } from "@storybook/react/types-6-0"
import { StepGauge, StepGaugeProps } from "./StepGauge"

export default {
  title: "Charts/StepGauge",
  component: StepGauge,
}

const Template: Story<StepGaugeProps> = (args) => <StepGauge {...args} />

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Progress",
  completed: 2,
}
