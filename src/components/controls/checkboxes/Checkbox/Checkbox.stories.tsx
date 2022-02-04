import { Story } from "@storybook/react/types-6-0"
import * as React from "react"
import { Checkbox, CheckboxProps } from "./Checkbox"

export default {
  title: "Controls/Checkboxes/Checkbox",
  component: Checkbox,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=91%3A173",
    },
  },
}

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Label",
}
