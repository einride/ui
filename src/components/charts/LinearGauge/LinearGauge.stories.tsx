import { Story } from "@storybook/react/types-6-0"
import { LinearGauge, LinearGaugeProps } from "./LinearGauge"

export default {
  title: "Charts/LinearGauge",
  component: LinearGauge,
}

const Template: Story<LinearGaugeProps> = (args) => <LinearGauge {...args} />

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Progress",
  value: 40,
}
