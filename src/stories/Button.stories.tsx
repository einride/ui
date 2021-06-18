import { Story } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from "../components/Button";

export default {
  title: "Form/Button",
  component: Button,
  argTypes: {},
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Click me!",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Click me!",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  variant: "tertiary",
  children: "Click me!",
};
