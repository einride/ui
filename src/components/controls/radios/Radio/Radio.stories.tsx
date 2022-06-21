import { Story } from "@storybook/react/types-6-0"
import { Radio, RadioProps } from "./Radio"

export default {
  title: "Controls/Radios/Radio",
  component: Radio,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<RadioProps> = (args) => <Radio {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Label",
}

export const Controlled = Template.bind({})
Controlled.args = {
  checked: true,
  children: "Label",
}
