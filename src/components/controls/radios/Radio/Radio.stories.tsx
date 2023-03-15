import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { Radio } from "./Radio"

const meta = {
  title: "Controls/Radios/Radio",
  component: Radio,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const WithLabel = {
  args: {
    children: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio", { name: "Label" })
    await expect(radio).not.toBeChecked()
  },
} satisfies Story

export const DefaultChecked = {
  args: {
    ...WithLabel.args,
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio", { name: "Label" })
    await expect(radio).toBeChecked()
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof Radio>): JSX.Element => {
  const [checked, setChecked] = useState(false)
  return <Radio {...args} checked={checked} onCheckedChange={setChecked} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio", { name: "Label" })
    await expect(radio).not.toBeChecked()
  },
} satisfies Story

export const Mouse = {
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio", { name: "Label" })
    await expect(radio).not.toHaveFocus()
    await expect(radio).not.toBeChecked()
    await userEvent.click(radio)
    await expect(radio).toHaveFocus()
    await expect(radio).toBeChecked()
  },
} satisfies Story

export const Keyboard = {
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio", { name: "Label" })
    await expect(radio).not.toHaveFocus()
    await expect(radio).not.toBeChecked()
    await userEvent.tab()
    await expect(radio).toHaveFocus()
    await userEvent.keyboard("[Space]")
    await expect(radio).toBeChecked()
  },
} satisfies Story

const GroupTemplate = (): JSX.Element => {
  return (
    <>
      <Radio name="name">Label 1</Radio>
      <Radio name="name">Label 2</Radio>
      <Radio name="name">Label 3</Radio>
    </>
  )
}

export const GroupMouse = {
  render: (args) => <GroupTemplate {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio1 = canvas.getByRole("radio", { name: "Label 1" })
    const radio2 = canvas.getByRole("radio", { name: "Label 2" })
    const radio3 = canvas.getByRole("radio", { name: "Label 3" })
    await expect(radio1).not.toBeChecked()
    await expect(radio2).not.toBeChecked()
    await expect(radio3).not.toBeChecked()
    await userEvent.click(radio1)
    await expect(radio1).toBeChecked()
    await expect(radio2).not.toBeChecked()
    await expect(radio3).not.toBeChecked()
    await userEvent.click(radio2)
    await expect(radio1).not.toBeChecked()
    await expect(radio2).toBeChecked()
    await expect(radio3).not.toBeChecked()
    await userEvent.click(radio3)
    await expect(radio1).not.toBeChecked()
    await expect(radio2).not.toBeChecked()
    await expect(radio3).toBeChecked()
    await userEvent.click(radio3) // ensure you can't uncheck radio button by clicking again
    await expect(radio1).not.toBeChecked()
    await expect(radio2).not.toBeChecked()
    await expect(radio3).toBeChecked()
  },
} satisfies Story

export const GroupKeyboard = {
  render: (args) => <GroupTemplate {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio1 = canvas.getByRole("radio", { name: "Label 1" })
    const radio2 = canvas.getByRole("radio", { name: "Label 2" })
    const radio3 = canvas.getByRole("radio", { name: "Label 3" })
    await userEvent.tab()
    await expect(radio1).toHaveFocus()
    await expect(radio1).not.toBeChecked()
    await expect(radio2).not.toBeChecked()
    await expect(radio3).not.toBeChecked()
    await userEvent.keyboard("[Space]")
    await expect(radio1).toBeChecked()
    await expect(radio2).not.toBeChecked()
    await expect(radio3).not.toBeChecked()
    await userEvent.keyboard("[ArrowDown]")
    await expect(radio1).not.toBeChecked()
    await expect(radio2).toBeChecked()
    await expect(radio3).not.toBeChecked()
    await userEvent.keyboard("[ArrowUp]")
    await userEvent.keyboard("[ArrowUp]") // ensure radio focus loops
    await expect(radio1).not.toBeChecked()
    await expect(radio2).not.toBeChecked()
    await expect(radio3).toBeChecked()
    await userEvent.keyboard("[ArrowDown]")
    await expect(radio1).toBeChecked()
    await expect(radio2).not.toBeChecked()
    await expect(radio3).not.toBeChecked()
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[WithLabel, DefaultChecked].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Radio key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Story
