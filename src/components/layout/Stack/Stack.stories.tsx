import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { SecondaryButton } from "../../controls/buttons/SecondaryButton/SecondaryButton"
import { Stack } from "./Stack"

export default {
  title: "Layout/Stack",
  component: Stack,
} satisfies ComponentMeta<typeof Stack>

type Story = ComponentStoryObj<typeof Stack>

export const Default = {
  render: (args) => (
    <Stack {...args}>
      <PrimaryButton>Button</PrimaryButton>
      <SecondaryButton>Button</SecondaryButton>
      <IconButton aria-label="Button" icon="bolt" />
    </Stack>
  ),
} satisfies Story

export const AlignStart = {
  ...Default,
  args: {
    alignItems: "start",
  },
} satisfies Story
