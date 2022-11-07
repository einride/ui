import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Checkbox } from "./Checkbox"

export default {
  title: "Controls/Checkboxes/Checkbox",
  component: Checkbox,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Label",
}

export const Controlled = Template.bind({})
Controlled.args = {
  checked: true,
  children: "Label",
}
