import { Story } from "@storybook/react/types-6-0"
import { LabelCheckbox, LabelCheckboxProps } from "./LabelCheckbox"

export default {
  title: "Controls/Checkboxes/LabelCheckbox",
  component: LabelCheckbox,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=91%3A173",
    },
  },
}

const Template: Story<LabelCheckboxProps> = (args) => (
  <LabelCheckbox {...args} />
)

export const Default = Template.bind({})
Default.args = { label: "Label" }
