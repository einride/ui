import { Story } from "@storybook/react/types-6-0";
import {
  LabelDropdownSelect,
  LabelDropdownSelectProps,
} from "./LabelDropdownSelect";

export default {
  title: "Controls/Selects/LabelDropdownSelect",
  component: LabelDropdownSelect,
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

const Template: Story<LabelDropdownSelectProps> = (args) => (
  <LabelDropdownSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  options: ["Option 1", "Option 2", "Option 3"],
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  label: "Label",
  options: ["Option 1", "Option 2", "Option 3"],
  placeholder: "Placeholder...",
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  label: "Label",
  options: ["Option 1", "Option 2", "Option 3"],
  defaultValue: "Option 2",
};
