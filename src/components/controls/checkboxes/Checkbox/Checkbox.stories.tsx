import { Story } from "@storybook/react/types-6-0"
import { Checkbox, CheckboxProps } from "./Checkbox"

export default {
  title: "Controls/Checkboxes/Checkbox",
  component: Checkbox,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Label",
}

export const Controlled = Template.bind({})
Controlled.args = {
  checked: true,
  children: "Label",
}
