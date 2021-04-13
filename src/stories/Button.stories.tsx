import { Story } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from "../components/Button";

export default {
  title: "Form/Button",
  component: Button,
  argTypes: {
    formId: {
      control: false,
    },
  },
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Buttons",
};

export const FullWidthWithArrow = Template.bind({});
FullWidthWithArrow.args = {
  ...Default.args,
  hasArrow: true,
  isFullWidth: true,
};
