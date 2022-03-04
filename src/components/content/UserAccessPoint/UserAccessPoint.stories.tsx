import { Story } from "@storybook/react/types-6-0"
import { UserAccessPoint, UserAccessPointProps } from "./UserAccessPoint"

export default {
  title: "Content/UserAccessPoint",
  component: UserAccessPoint,
  argTypes: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/UI-Components?node-id=0%3A1",
    },
  },
}

const Template: Story<UserAccessPointProps> = (args) => (
  <UserAccessPoint {...args} />
)

export const Default = Template.bind({})
Default.args = {
  avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
}
