import { Story } from "@storybook/react/types-6-0";
import { Input, InputProps } from "../components/Input";

export default {
  title: "Form/Input",
  component: Input,
  argTypes: {},
};

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Origin",
  placeholder: "Type an origin",
};

export const Dark = Template.bind({});
Dark.args = {
  ...Default.args,
  isDark: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Default.args,
  isFullWidth: true,
};

export const DarkFullWidth = Template.bind({});
DarkFullWidth.args = {
  ...Default.args,
  isDark: true,
  isFullWidth: true,
};
