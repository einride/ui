import { Story } from "@storybook/react/types-6-0";
import { VerticalLayout, VerticalLayoutProps } from "./VerticalLayout";

export default {
  title: "Layout/VerticalLayout",
  component: VerticalLayout,
  parameters: {
    design: {
      // TODO: add correct link to Figma
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=4%3A16",
    },
  },
};

const Template: Story<VerticalLayoutProps> = (args) => (
  <VerticalLayout {...args}>
    <div>Row 1</div>
    <div>Row 2</div>
    <div>Row 3</div>
  </VerticalLayout>
);

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: "extraLarge",
};
