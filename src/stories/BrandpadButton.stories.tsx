import { Story } from "@storybook/react/types-6-0";
import {
  BrandpadButton,
  BrandpadButtonProps,
} from "../components/BrandpadButton";

export default {
  title: "Form/BrandpadButton",
  component: BrandpadButton,
  argTypes: {},
};

const Template: Story<BrandpadButtonProps> = (args) => (
  <BrandpadButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
