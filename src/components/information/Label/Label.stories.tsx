import { Story } from "@storybook/react/types-6-0"
import { Label, LabelProps } from "./Label"

export default {
  title: "Information/Label",
  component: Label,
}

const Template: Story<LabelProps> = (args) => <Label {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Label",
}

export const Positive = Template.bind({})
Positive.args = {
  children: "Label",
  variant: "positive",
}

export const Negative = Template.bind({})
Negative.args = {
  children: "Label",
  variant: "negative",
}
