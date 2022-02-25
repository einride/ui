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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=1093%3A109",
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
