import { Story } from "@storybook/react/types-6-0";
import { DefaultRadio, DefaultRadioProps } from "./DefaultRadio";

export default {
  title: "Controls/Radios/DefaultRadio",
  component: DefaultRadio,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=91%3A81",
    },
  },
};

const Template: Story<DefaultRadioProps> = (args) => <DefaultRadio {...args} />;

export const Default = Template.bind({});
Default.args = {};
