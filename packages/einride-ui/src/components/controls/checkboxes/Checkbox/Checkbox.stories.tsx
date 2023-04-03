import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { Checkbox } from "./Checkbox"

/** Checkbox control. */
const meta = {
  component: Checkbox,
  argTypes: {
    innerWrapperProps: {
      control: false,
    },
    labelProps: {
      control: false,
    },
    wrapperProps: {
      control: false,
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", { name: Basic.args.children })
    await expect(checkbox).not.toBeChecked()
  },
} satisfies Story

export const DefaultChecked = {
  args: {
    ...Basic.args,
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", { name: DefaultChecked.args.children })
    await expect(checkbox).toBeChecked()
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof Checkbox>): JSX.Element => {
  const [checked, setChecked] = useState(false)
  return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", { name: Controlled.args.children })
    await expect(checkbox).not.toBeChecked()
  },
} satisfies StoryObj

export const Pointer = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", { name: Pointer.args.children })
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
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole("checkbox", { name: Keyboard.args.children })
    await expect(checkbox).not.toBeChecked()
    await expect(checkbox).not.toHaveFocus()
    await userEvent.tab()
    await expect(checkbox).toHaveFocus()
    await expect(checkbox).not.toBeChecked()
    await userEvent.keyboard("[Space]")
    await expect(checkbox).toBeChecked()
  },
} satisfies Story

const GroupTemplate = (): JSX.Element => {
  return (
    <>
      <Checkbox name="name">Label 1</Checkbox>
      <Checkbox name="name">Label 2</Checkbox>
      <Checkbox name="name">Label 3</Checkbox>
    </>
  )
}

export const GroupPointer = {
  render: () => <GroupTemplate />,
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
} satisfies StoryObj

export const GroupKeyboard = {
  render: (args) => <GroupTemplate {...args} />,
  args: {
    ...Basic.args,
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

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic, DefaultChecked].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Checkbox key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
