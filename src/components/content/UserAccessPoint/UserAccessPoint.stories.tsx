import { Story } from "@storybook/react/types-6-0"
import { UserAccessPoint, UserAccessPointProps } from "./UserAccessPoint"

export default {
  title: "Content/UserAccessPoint",
  component: UserAccessPoint,
}

const Template: Story<UserAccessPointProps> = (args) => <UserAccessPoint {...args} />

export const Default = Template.bind({})
Default.args = {
  avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
  status: "default",
}

export const NoUser = Template.bind({})
NoUser.args = {
  avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
  status: "no-user",
}

export const Notification = Template.bind({})
Notification.args = {
  avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
  status: "notification",
}
