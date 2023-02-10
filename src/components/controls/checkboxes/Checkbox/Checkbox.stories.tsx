import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Checkbox } from "./Checkbox"

export default {
  title: "Controls/Checkboxes/Checkbox",
  component: Checkbox,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies ComponentMeta<typeof Checkbox>

type Story = ComponentStoryObj<typeof Checkbox>

export const WithLabel = {
  args: {
    children: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", { name: "Label" })
    await expect(checkbox).not.toBeChecked()
  },
} satisfies Story

export const DefaultChecked = {
  args: {
    ...WithLabel.args,
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", { name: "Label" })
    await expect(checkbox).toBeChecked()
  },
} satisfies Story

const ControlledTemplate: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(false)
  return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", { name: "Label" })
    await expect(checkbox).not.toBeChecked()
  },
} satisfies Story

export const Mouse = {
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", { name: "Label" })
    await expect(checkbox).not.toBeChecked()
    await expect(checkbox).not.toHaveFocus()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await expect(checkbox).toHaveFocus()
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  },
} satisfies Story

export const Keyboard = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", { name: "Label" })
    await expect(checkbox).not.toBeChecked()
    await expect(checkbox).not.toHaveFocus()
    await userEvent.tab()
    await expect(checkbox).toHaveFocus()
    await expect(checkbox).not.toBeChecked()
    await userEvent.keyboard("[Space]")
    await expect(checkbox).toBeChecked()
  },
} satisfies Story

const GroupTemplate: ComponentStory<typeof Checkbox> = () => {
  return (
    <>
      <Checkbox name="name">Label 1</Checkbox>
      <Checkbox name="name">Label 2</Checkbox>
      <Checkbox name="name">Label 3</Checkbox>
    </>
  )
}
export const GroupMouse = {
  render: (args) => <GroupTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox1 = canvas.getByRole("checkbox", { name: "Label 1" })
    const checkbox2 = canvas.getByRole("checkbox", { name: "Label 2" })
    const checkbox3 = canvas.getByRole("checkbox", { name: "Label 3" })
    await expect(checkbox1).not.toBeChecked()
    await expect(checkbox2).not.toBeChecked()
    await expect(checkbox3).not.toBeChecked()
    await userEvent.click(checkbox1)
    await expect(checkbox1).toBeChecked()
    await expect(checkbox2).not.toBeChecked()
    await expect(checkbox3).not.toBeChecked()
    await userEvent.click(checkbox2)
    await expect(checkbox1).toBeChecked()
    await expect(checkbox2).toBeChecked()
    await expect(checkbox3).not.toBeChecked()
    await userEvent.click(checkbox3)
    await expect(checkbox1).toBeChecked()
    await expect(checkbox2).toBeChecked()
    await expect(checkbox3).toBeChecked()
    await userEvent.click(checkbox2)
    await expect(checkbox1).toBeChecked()
    await expect(checkbox2).not.toBeChecked()
    await expect(checkbox3).toBeChecked()
  },
} satisfies Story

export const GroupKeyboard = {
  render: (args) => <GroupTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox1 = canvas.getByRole("checkbox", { name: "Label 1" })
    const checkbox2 = canvas.getByRole("checkbox", { name: "Label 2" })
    const checkbox3 = canvas.getByRole("checkbox", { name: "Label 3" })
    await expect(checkbox1).not.toBeChecked()
    await expect(checkbox2).not.toBeChecked()
    await expect(checkbox3).not.toBeChecked()
    await expect(checkbox1).not.toHaveFocus()
    await expect(checkbox2).not.toHaveFocus()
    await expect(checkbox3).not.toHaveFocus()
    await userEvent.tab()
    await expect(checkbox1).toHaveFocus()
    await expect(checkbox2).not.toHaveFocus()
    await expect(checkbox3).not.toHaveFocus()
    await userEvent.keyboard("[Space]")
    await expect(checkbox1).toBeChecked()
    await expect(checkbox2).not.toBeChecked()
    await expect(checkbox3).not.toBeChecked()
    await userEvent.tab()
    await expect(checkbox1).not.toHaveFocus()
    await expect(checkbox2).toHaveFocus()
    await expect(checkbox3).not.toHaveFocus()
    await userEvent.keyboard("[Space]")
    await expect(checkbox1).toBeChecked()
    await expect(checkbox2).toBeChecked()
    await expect(checkbox3).not.toBeChecked()
    await userEvent.tab()
    await expect(checkbox1).not.toHaveFocus()
    await expect(checkbox2).not.toHaveFocus()
    await expect(checkbox3).toHaveFocus()
    await userEvent.keyboard("[Space]")
    await expect(checkbox1).toBeChecked()
    await expect(checkbox2).toBeChecked()
    await expect(checkbox3).toBeChecked()
    await userEvent.tab({ shift: true })
    await expect(checkbox1).not.toHaveFocus()
    await expect(checkbox2).toHaveFocus()
    await expect(checkbox3).not.toHaveFocus()
    await userEvent.keyboard("[Space]")
    await expect(checkbox1).toBeChecked()
    await expect(checkbox2).not.toBeChecked()
    await expect(checkbox3).toBeChecked()
  },
} satisfies Story
