import { Story } from "@storybook/react/types-6-0"
import { Textarea, TextareaProps } from "./Textarea"

export default {
  title: "Controls/Textareas/Textarea",
  component: Textarea,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<TextareaProps> = (args) => <Textarea {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Label",
  placeholder: "Placeholder...",
}

export const Message = Template.bind({})
Message.args = {
  label: "Label",
  placeholder: "Placeholder...",
  message: "Message",
}
