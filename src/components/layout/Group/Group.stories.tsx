import { Meta, StoryObj } from "@storybook/react"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { SecondaryButton } from "../../controls/buttons/SecondaryButton/SecondaryButton"
import { Group } from "./Group"

const meta = {
  component: Group,
} satisfies Meta<typeof Group>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  render: (args) => (
    <Group {...args}>
      <PrimaryButton>Button</PrimaryButton>
      <SecondaryButton>Button</SecondaryButton>
      <IconButton aria-label="Button" icon="bolt" />
    </Group>
  ),
} satisfies Story

export const SpaceBetween = {
  ...Basic,
  args: {
    justifyContent: "space-between",
  },
} satisfies Story
