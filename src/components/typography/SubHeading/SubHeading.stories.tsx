import { Story } from "@storybook/react/types-6-0";
import { SubHeading, SubHeadingProps } from "./SubHeading";

export default {
  title: "Typography/SubHeading",
  component: SubHeading,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=255%3A51",
    },
  },
};

const Template: Story<SubHeadingProps> = (args) => <SubHeading {...args} />;

export const Default = Template.bind({});
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
};
