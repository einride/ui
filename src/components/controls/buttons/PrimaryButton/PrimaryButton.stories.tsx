import { Story } from "@storybook/react/types-6-0";
import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";

export default {
  title: "Controls/Buttons/PrimaryButton",
  component: PrimaryButton,
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
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=7%3A23",
    },
  },
};

const Template: Story<PrimaryButtonProps> = (args) => (
  <PrimaryButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Button",
};
