import { ComponentStory } from "@storybook/react"
import { UserAccessPoint } from "./UserAccessPoint"

export default {
  title: "Content/UserAccessPoint",
  component: UserAccessPoint,
}

const Template: ComponentStory<typeof UserAccessPoint> = (args) => <UserAccessPoint {...args} />

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

export const Initials = Template.bind({})
Initials.args = {
  name: "Filip Tammergård",
}
