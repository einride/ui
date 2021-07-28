import { Story } from "@storybook/react/types-6-0";
import {
  DefaultDropdownSelect,
  DefaultDropdownSelectProps,
} from "./DefaultDropdownSelect";

export default {
  title: "Controls/Selects/DefaultDropdownSelect",
  component: DefaultDropdownSelect,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=1237%3A108",
    },
  },
};

const Template: Story<DefaultDropdownSelectProps> = (args) => (
  <DefaultDropdownSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  options: ["Option 1", "Option 2", "Option 3"],
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  options: ["Option 1", "Option 2", "Option 3"],
  placeholder: "Placeholder...",
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  options: ["Option 1", "Option 2", "Option 3"],
  defaultValue: "Option 2",
};
