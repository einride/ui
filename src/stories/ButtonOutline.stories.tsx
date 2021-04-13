import { Story } from "@storybook/react/types-6-0";
import { ButtonOutline, ButtonOutlineProps } from "../components/ButtonOutline";

export default {
  title: "Form/Buttons/ButtonOutline",
  component: ButtonOutline,
  argTypes: {},
};

const Template: Story<ButtonOutlineProps> = (args) => (
  <ButtonOutline {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
