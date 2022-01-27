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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=91%3A81",
    },
  },
}

const Template: Story<RadioProps> = (args) => <Radio {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Label",
}
