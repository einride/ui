import { Story } from "@storybook/react/types-6-0";
import {
  PrimaryButton,
  PrimaryButtonProps,
} from "../../components/buttons/PrimaryButton";

export default {
  title: "Form/PrimaryButton",
  component: PrimaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
};

const Template: Story<PrimaryButtonProps> = (args) => (
  <PrimaryButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
