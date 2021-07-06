import { Story } from "@storybook/react/types-6-0";
import { WithIconButton, WithIconButtonProps } from "./WithIconButton";

export default {
  title: "Controls/Buttons/WithIconButton",
  component: WithIconButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=7%3A74",
    },
    docs: {
      description: {
        component: "Some component _markdown_",
      },
    },
  },
};

const Template: Story<WithIconButtonProps> = (args) => (
  <WithIconButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Button",
};
