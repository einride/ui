import { Story } from "@storybook/react/types-6-0";
import { SmallText, SmallTextProps } from "./SmallText";

export default {
  title: "Typography/SmallText",
  component: SmallText,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A147",
    },
  },
};

const Template: Story<SmallTextProps> = (args) => <SmallText {...args} />;

export const Default = Template.bind({});
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
};
