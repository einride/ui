import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Radio } from "./Radio"

export default {
  title: "Controls/Radios/Radio",
  component: Radio,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Radio>

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Label",
}

export const Controlled = Template.bind({})
Controlled.args = {
  checked: true,
  children: "Label",
}
