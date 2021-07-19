import { Story } from "@storybook/react/types-6-0";
import { LabelRadio, LabelRadioProps } from "./LabelRadio";

export default {
  title: "Controls/Radios/LabelRadio",
  component: LabelRadio,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=91%3A128",
    },
  },
};

const Template: Story<LabelRadioProps> = (args) => <LabelRadio {...args} />;

export const Default = Template.bind({});
Default.args = { label: "Label" };
