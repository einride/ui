import { Story } from "@storybook/react/types-6-0";
import {
  IconButton,
  IconButtonProps,
} from "../../components/buttons/IconButton";

export default {
  title: "Buttons/IconButton",
  component: IconButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
    size: {
      options: ["Small", "Large"],
      control: { type: "radio" },
    },
  },
};

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
