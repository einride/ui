import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Label } from "./Label"

export default {
  title: "Information/Label",
  component: Label,
} as ComponentMeta<typeof Label>

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: "Label",
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const label = canvas.getByText("Label")
  await expect(label).toBeInTheDocument()
}

export const Positive = Template.bind({})
Positive.args = {
  ...Basic.args,
  variant: "positive",
}
Positive.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const label = canvas.getByText("Label")
  await expect(label).toBeInTheDocument()
}

export const Negative = Template.bind({})
Negative.args = {
  ...Basic.args,
  variant: "negative",
}
Negative.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const label = canvas.getByText("Label")
  await expect(label).toBeInTheDocument()
}
