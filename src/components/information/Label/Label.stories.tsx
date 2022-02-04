import { Story } from "@storybook/react/types-6-0"
import * as React from "react"
import { Label, LabelProps } from "./Label"

export default {
  title: "Information/Label",
  component: Label,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=75%3A31",
    },
  },
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
