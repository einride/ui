import { Story } from "@storybook/react/types-6-0";
import { Small, SmallProps } from "../components/Small";

export default {
  title: "Typography/Small",
  component: Small,
  argTypes: {},
};

const Template: Story<SmallProps> = (args) => <Small {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Some text",
};
