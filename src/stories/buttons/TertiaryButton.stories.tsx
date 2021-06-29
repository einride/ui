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
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=7%3A27",
    },
  },
};

const Template: Story<TertiaryButtonProps> = (args) => (
  <TertiaryButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Button",
};
