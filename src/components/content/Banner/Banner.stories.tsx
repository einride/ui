import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Banner } from "./Banner"

export default {
  title: "Content/Banner",
  component: Banner,
} as ComponentMeta<typeof Banner>

const Template: ComponentStory<typeof Banner> = (args) => <Banner {...args} />

export const Default = Template.bind({})
Default.args = {
  title: "Title",
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const title = canvas.getByText("Title")
  expect(title).toBeInTheDocument()
}

export const Success = Template.bind({})
Success.args = {
  ...Default.args,
  status: "success",
}

export const Warning = Template.bind({})
Warning.args = {
  ...Default.args,
  status: "warning",
}

export const Fail = Template.bind({})
Fail.args = {
  ...Default.args,
  status: "fail",
}
