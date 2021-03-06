import { Story } from "@storybook/react/types-6-0"
import { LabelTextInput, LabelTextInputProps } from "./LabelTextInput"

export default {
  title: "Controls/Inputs/LabelTextInput",
  component: LabelTextInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<LabelTextInputProps> = (args) => <LabelTextInput {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Label",
  placeholder: "Placeholder...",
}

export const Positive = Template.bind({})
Positive.args = {
  ...Default.args,
  message: "Confirmation message.",
  status: "success",
}

export const Negative = Template.bind({})
Negative.args = {
  ...Default.args,
  message: "Error message.",
  status: "fail",
}

export const Controlled = Template.bind({})
Controlled.args = {
  ...Default.args,
  value: "",
}
