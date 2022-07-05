import { Story } from "@storybook/react/types-6-0"
import { TextInput, TextInputProps } from "./TextInput"

export default {
  title: "Controls/Inputs/TextInput",
  component: TextInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<TextInputProps> = (args) => <TextInput {...args} />

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Label",
  placeholder: "Placeholder...",
}

export const Label = Template.bind({})
Label.args = {
  label: "Label",
}

export const Positive = Template.bind({})
Positive.args = {
  ...Label.args,
  message: "Confirmation message.",
  status: "success",
}

export const Negative = Template.bind({})
Negative.args = {
  ...Label.args,
  message: "Error message.",
  status: "fail",
}
