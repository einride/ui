import { Story } from "@storybook/react/types-6-0"
import { Link, LinkProps } from "./Link"

export default {
  title: "Typography/Link",
  component: Link,
}

const Template: Story<LinkProps<"a">> = (args) => <Link {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "A whole new way to ship.",
}
