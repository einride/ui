import { Meta, StoryObj } from "@storybook/react"
import { Icon } from "../../content/Icon/Icon"
import { Option } from "./Option"

const meta = {
  component: Option,
} satisfies Meta<typeof Option>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children: "Option",
    icon: <Icon name="arrowRight" />,
  },
} satisfies Story

export const Selected = {
  args: {
    ...Basic.args,
    selected: true,
  },
} satisfies Story

export const Secondary = {
  args: {
    ...Basic.args,
    variant: "secondary",
  },
} satisfies Story

export const SecondarySelected = {
  args: {
    ...Secondary.args,
    selected: true,
  },
} satisfies Story

export const AsButton = {
  args: {
    ...Basic.args,
    as: "button",
  },
} satisfies Story
