import { Story } from "@storybook/react/types-6-0";
import {
  IconButton,
  IconButtonProps,
} from "../../components/buttons/IconButton";

export default {
  title: "Buttons/IconButton",
  subtitle: "aslkdjalskdjlaksj",
  component: IconButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
    size: {
      options: ["small", "large"],
      control: { type: "radio" },
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Some component _markdown_",
      },
    },
  },
};

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
