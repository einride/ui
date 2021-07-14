import { Story } from "@storybook/react/types-6-0";
import { DropdownSelect, DropdownSelectProps } from "./DropdownSelect";

export default {
  title: "Controls/Selects/DropdownInput",
  component: DropdownSelect,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=91%3A41",
    },
  },
};

const Template: Story<DropdownSelectProps> = (args) => (
  <DropdownSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  options: ["Option 1", "Option 2", "Option 3"],
  placeholder: "Placeholder...",
};
