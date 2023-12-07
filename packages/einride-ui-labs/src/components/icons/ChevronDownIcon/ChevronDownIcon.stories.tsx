/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from "@einride/ui"
import { Meta, StoryObj } from "@storybook/react"
import { ChevronDownIcon } from "./ChevronDownIcon"

const meta = {
  component: ChevronDownIcon,
} satisfies Meta<typeof ChevronDownIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {} satisfies Story

export const Size = {
  args: {
    size: "sm",
  },
} satisfies Story

export const Color = {
  render: () => {
    const theme = useTheme()
    return <ChevronDownIcon color={theme.colors.content.warning} />
  },
} satisfies Story
