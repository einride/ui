/** @jsxImportSource theme-ui */
import { Story } from "@storybook/react/types-6-0";
import {
  PrimaryButton,
  PrimaryButtonProps,
} from "../components/Buttons/PrimaryButton";

export default {
  title: "Form/PrimaryButton",
  component: PrimaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
    style: {
      control: "raw",
    },
  },
};

const Template: Story<PrimaryButtonProps> = (args) => (
  <PrimaryButton {...args} className="class" />
);

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
