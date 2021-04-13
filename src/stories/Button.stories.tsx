import { Story } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from "../components/Button";

export default {
  title: "Form/Buttons/Button",
  component: Button,
  argTypes: {},
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
