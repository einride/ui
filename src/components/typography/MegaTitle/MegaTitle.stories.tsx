import { Story } from "@storybook/react/types-6-0";
import { MegaTitleProps, MetaTitle } from "./MegaTitle";

export default {
  title: "Typography/MegaTitle",
  component: MetaTitle,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A143",
    },
  },
};

const Template: Story<MegaTitleProps> = (args) => <MetaTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "A whole new way to ship.",
};
