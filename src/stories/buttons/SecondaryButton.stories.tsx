import { Story } from "@storybook/react/types-6-0";
import {
  SecondaryButton,
  SecondaryButtonProps,
} from "../../components/buttons/SecondaryButton";

export default {
  title: "Buttons/SecondaryButton",
  component: SecondaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
    size: {
      options: ["small", "large"],
      control: { type: "radio" },
    },
  },
};

const Template: Story<SecondaryButtonProps> = (args) => (
  <SecondaryButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
