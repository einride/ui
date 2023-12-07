/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from "@einride/ui"
import { Meta, StoryObj } from "@storybook/react"
import { ChevronUpIcon } from "./ChevronUpIcon"

const meta = {
  component: ChevronUpIcon,
} satisfies Meta<typeof ChevronUpIcon>

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
    return <ChevronUpIcon color={theme.colors.content.warning} />
  },
} satisfies Story
