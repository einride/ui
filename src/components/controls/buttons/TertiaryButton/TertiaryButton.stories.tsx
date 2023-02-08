import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { ComponentProps } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { Icon } from "../../../content/Icon/Icon"
import { TertiaryButton } from "./TertiaryButton"

export default {
  title: "Controls/Buttons/TertiaryButton",
  component: TertiaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof TertiaryButton>

const Template: ComponentStory<typeof TertiaryButton> = (args) => <TertiaryButton {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: "Button",
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).not.toBeDisabled()
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  ...Basic.args,
  isFullWidth: true,
}
FullWidth.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).not.toBeDisabled()
}

export const IconRight = Template.bind({})
IconRight.args = {
  ...Basic.args,
  rightIcon: <Icon name="arrowRight" />,
}
IconRight.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).not.toBeDisabled()
}

export const IsLoading = Template.bind({})
IsLoading.args = {
  ...Basic.args,
  isLoading: true,
}
IsLoading.parameters = {
  chromatic: { disableSnapshot: true },
}
IsLoading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).not.toBeDisabled()
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Basic.args,
  disabled: true,
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).toBeDisabled()
}

export const Snapshot = (): JSX.Element => (
  <SnapshotWrapper>
    {[Basic, FullWidth, IconRight, Disabled].map((Story, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Story key={index} {...(Story.args as ComponentProps<typeof TertiaryButton>)} />
    ))}
  </SnapshotWrapper>
)
Snapshot.parameters = {
  chromatic: { disableSnapshot: false },
}
