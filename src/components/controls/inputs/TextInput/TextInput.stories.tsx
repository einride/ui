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
