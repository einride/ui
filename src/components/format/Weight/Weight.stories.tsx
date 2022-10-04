import { Story } from "@storybook/react/types-6-0"
import { Weight, WeightProps } from "./Weight"

export default {
  title: "Format/Weight",
  component: Weight,
}

const Template: Story<WeightProps> = (args) => <Weight {...args} />

export const Default = Template.bind({})
Default.args = {
  kilograms: 12345.67,
  locales: "en-US",
  unit: "metric",
}
