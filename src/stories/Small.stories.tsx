import { Story } from "@storybook/react/types-6-0";
import { Small, SmallProps } from "../components/Small";

export default {
  title: "Typography/Small",
  component: Small,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A147",
    },
  },
};

const Template: Story<SmallProps> = (args) => <Small {...args} />;

export const Default = Template.bind({});
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
};
