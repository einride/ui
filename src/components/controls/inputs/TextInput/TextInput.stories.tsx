import { Story } from "@storybook/react/types-6-0";
import { TextInput, TextInputProps } from "./TextInput";

export default {
  title: "Controls/Inputs/TextInput",
  component: TextInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=12%3A88",
    },
  },
};

const Template: Story<TextInputProps> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  placeholder: "Placeholder...",
  value: "",
};

export const Positive = Template.bind({});
Positive.args = {
  ...Default.args,
  status: "success",
  statusMessage: "Confirmation message.",
};

export const Negative = Template.bind({});
Negative.args = {
  ...Default.args,
  status: "fail",
  statusMessage: "Error message.",
};
