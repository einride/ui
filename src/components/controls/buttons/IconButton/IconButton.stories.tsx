import { Story } from "@storybook/react/types-6-0";
import { IconButton, IconButtonProps } from "./IconButton";

export default {
  title: "Controls/Buttons/IconButton",
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
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=122%3A125",
    },
  },
};

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
