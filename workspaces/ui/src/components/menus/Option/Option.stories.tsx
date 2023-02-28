import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Icon } from "../../content/Icon/Icon"
import { Option } from "./Option"

export default {
  title: "Menus/Option",
  component: Option,
} satisfies ComponentMeta<typeof Option>

type Story = ComponentStoryObj<typeof Option>

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
