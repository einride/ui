import { Story } from "@storybook/react/types-6-0";
import { Text, TextProps } from "./Text";

export default {
  title: "Typography/Text",
  component: Text,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A146",
    },
  },
};

const Template: Story<TextProps> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
};
