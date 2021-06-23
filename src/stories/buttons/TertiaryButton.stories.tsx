import { Story } from "@storybook/react/types-6-0";
import {
  TertiaryButton,
  TertiaryButtonProps,
} from "../../components/buttons/TertiaryButton";

export default {
  title: "Buttons/TertiaryButton",
  component: TertiaryButton,
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

const Template: Story<TertiaryButtonProps> = (args) => (
  <TertiaryButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
