import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Switch } from "./Switch"

export default {
  title: "Controls/Switches/Switch",
  component: Switch,
} satisfies ComponentMeta<typeof Switch>

type Story = ComponentStoryObj<typeof Switch>

export const Default = {
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
    ...Default.args,
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("switch")
    await expect(input).toBeChecked()
  },
} satisfies Story

const ControlledTemplate: ComponentStory<typeof Switch> = (args) => {
  const [checked, setChecked] = useState(false)
  return <Switch {...args} checked={checked} onCheckedChange={setChecked} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Default.args,
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

export const Mouse = {
  args: {
    ...Default.args,
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
    ...Default.args,
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
