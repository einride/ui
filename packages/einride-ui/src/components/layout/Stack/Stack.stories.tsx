import { Meta, StoryObj } from "@storybook/react"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { SecondaryButton } from "../../controls/buttons/SecondaryButton/SecondaryButton"
import { Stack } from "./Stack"

const meta = {
  component: Stack,
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children: (
      <>
        <PrimaryButton>Button</PrimaryButton>
        <SecondaryButton>Button</SecondaryButton>
        <IconButton aria-label="Button" icon="bolt" />
      </>
    ),
  },
} satisfies Story

export const AlignStart = {
  args: {
    ...Basic.args,
    alignItems: "start",
  },
} satisfies Story
