import { Story } from "@storybook/react/types-6-0";
import { Body, BodyProps } from "../components/Body";

export default {
  title: "Typography/Body",
  component: Body,
  argTypes: {},
};

const Template: Story<BodyProps> = (args) => <Body {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Some text",
};
