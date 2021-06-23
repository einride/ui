import { Story } from "@storybook/react/types-6-0";
import {
  BaseButton,
  BaseButtonProps,
} from "../../components/buttons/BaseButton";

export default {
  title: "Buttons/BaseButton",
  component: BaseButton,
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

const Template: Story<BaseButtonProps> = (args) => <BaseButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
