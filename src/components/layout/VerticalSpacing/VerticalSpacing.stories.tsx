import { Story } from "@storybook/react/types-6-0";
import { VerticalSpacing, VerticalSpacingProps } from "./VerticalSpacing";

export default {
  title: "Layout/VerticalSpacing",
  component: VerticalSpacing,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=147%3A7",
    },
    docs: {
      description: {
        component:
          "Apply outline to the component to see behavior. Outline can be applied in the canvas settings.",
      },
    },
  },
};

const Template: Story<VerticalSpacingProps> = (args) => (
  <VerticalSpacing {...args} />
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
