import { Story } from "@storybook/react/types-6-0";
import {
  BaseButton,
  BaseButtonProps,
} from "../../components/buttons/BaseButton";

export default {
  title: "Form/Button",
  component: BaseButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
};

const Template: Story<BaseButtonProps> = (args) => <BaseButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
};
