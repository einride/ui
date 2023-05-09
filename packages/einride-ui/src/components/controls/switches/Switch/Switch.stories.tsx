import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { Switch } from "./Switch"

const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    label: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("switch")
    await expect(input).toHaveAccessibleName("Label")
  },
} satisfies Story

export const WithoutLabel = {
  args: {
    "aria-label": "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("switch")
    await expect(input).toHaveAccessibleName("Label")
  },
} satisfies Story

export const DefaultChecked = {
  args: {
    ...Basic.args,
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("switch")
    await expect(input).toBeChecked()
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof Switch>): React.JSX.Element => {
  const [checked, setChecked] = useState(false)
  return <Switch {...args} checked={checked} onCheckedChange={setChecked} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("switch")
    await expect(input).not.toBeChecked()
    await userEvent.click(input)
    await expect(input).toBeChecked()
    await userEvent.click(input)
    await expect(input).not.toBeChecked()
  },
} satisfies Story

export const Pointer = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("switch")
    await expect(input).not.toBeChecked()
    await userEvent.click(input)
    await expect(input).toBeChecked()
    await userEvent.click(input)
    await expect(input).not.toBeChecked()
  },
} satisfies Story

export const Keyboard = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("switch")
    await expect(input).not.toBeChecked()
    await expect(input).not.toHaveFocus()
    await userEvent.tab()
    await expect(input).not.toBeChecked()
    await expect(input).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await expect(input).toBeChecked()
    await userEvent.keyboard("[Space]")
    await expect(input).not.toBeChecked()
    await userEvent.tab()
    await expect(input).not.toHaveFocus()
  },
} satisfies Story
