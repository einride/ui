import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Textarea } from "./Textarea"

export default {
  title: "Controls/Textareas/Textarea",
  component: Textarea,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Textarea>

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />

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
