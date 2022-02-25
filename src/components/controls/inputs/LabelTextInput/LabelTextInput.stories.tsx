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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=12%3A88",
    },
  },
}

const Template: Story<LabelTextInputProps> = (args) => (
  <LabelTextInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: "Label",
  placeholder: "Placeholder...",
  value: "",
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
