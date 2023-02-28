import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { SecondaryButton } from "../../controls/buttons/SecondaryButton/SecondaryButton"
import { Group } from "./Group"

export default {
  title: "Layout/Group",
  component: Group,
} satisfies ComponentMeta<typeof Group>

type Story = ComponentStoryObj<typeof Group>

export const Default = {
  render: (args) => (
    <Group {...args}>
      <PrimaryButton>Button</PrimaryButton>
      <SecondaryButton>Button</SecondaryButton>
      <IconButton aria-label="Button" icon="bolt" />
    </Group>
  ),
} satisfies Story

export const SpaceBetween = {
  ...Default,
  args: {
    justifyContent: "space-between",
  },
} satisfies Story
