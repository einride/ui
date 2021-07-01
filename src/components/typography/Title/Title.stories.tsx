import { Story } from "@storybook/react/types-6-0";
import { Title, TitleProps } from "./Title";

export default {
  title: "Typography/Title",
  component: Title,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A144",
    },
  },
};

const Template: Story<TitleProps> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
};
