import { Story } from "@storybook/react/types-6-0";
import { BaseButton, BaseButtonProps } from "../components/Buttons/BaseButton";

export default {
  title: "Form/Button",
  component: BaseButton,
  argTypes: {
    disabled: {
      control: "color",
    },
  },
};

const Template: Story<BaseButtonProps> = (args) => (
  <BaseButton {...args} className="class" />
);

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
