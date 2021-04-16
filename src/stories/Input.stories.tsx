import { Story } from "@storybook/react/types-6-0";
import { Input, InputProps } from "../components/Input";

export default {
  title: "Form/Inputs",
  component: Input,
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
  },
};

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "This is a label",
  placeholder: "This is a placeholder",
  value: "",
};

export const Number = Template.bind({});
Number.args = {
  ...Default.args,
  type: "number",
};
