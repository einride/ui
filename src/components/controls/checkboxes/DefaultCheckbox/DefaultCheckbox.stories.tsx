import { Story } from "@storybook/react/types-6-0";
import { DefaultCheckbox, DefaultCheckboxProps } from "./DefaultCheckbox";

export default {
  title: "Controls/Checkboxes/DefaultCheckbox",
  component: DefaultCheckbox,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=87%3A126",
    },
  },
};

const Template: Story<DefaultCheckboxProps> = (args) => (
  <DefaultCheckbox {...args} />
);

export const Default = Template.bind({});
Default.args = {};
