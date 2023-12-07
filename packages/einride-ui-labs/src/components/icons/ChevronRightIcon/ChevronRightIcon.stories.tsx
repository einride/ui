/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from "@einride/ui"
import { Meta, StoryObj } from "@storybook/react"
import { ChevronRightIcon } from "./ChevronRightIcon"

const meta = {
  component: ChevronRightIcon,
} satisfies Meta<typeof ChevronRightIcon>

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
    return <ChevronRightIcon color={theme.colors.content.warning} />
  },
} satisfies Story
