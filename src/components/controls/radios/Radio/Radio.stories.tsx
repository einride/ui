import { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { Radio } from "./Radio"

const meta = {
  component: Radio,
  argTypes: {
    labelProps: {
      control: false,
    },
    wrapperProps: {
      control: false,
    },
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio", { name: Basic.args.children })
    await expect(radio).not.toBeChecked()
  },
} satisfies Story

export const DefaultChecked = {
  args: {
    ...Basic.args,
    defaultChecked: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio", { name: DefaultChecked.args.children })
    await expect(radio).toBeChecked()
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof Radio>): React.JSX.Element => {
  const [checked, setChecked] = useState(false)
  return <Radio {...args} checked={checked} onCheckedChange={setChecked} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio", { name: Controlled.args.children })
    await expect(radio).not.toBeChecked()
  },
} satisfies Story

export const Pointer = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio", { name: Pointer.args.children })
    await expect(radio).not.toHaveFocus()
    await expect(radio).not.toBeChecked()
    await userEvent.click(radio)
    await expect(radio).toHaveFocus()
    await expect(radio).toBeChecked()
  },
} satisfies Story

export const Keyboard = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio", { name: Keyboard.args.children })
    await expect(radio).not.toHaveFocus()
    await expect(radio).not.toBeChecked()
    await userEvent.tab()
    await expect(radio).toHaveFocus()
    await userEvent.keyboard("[Space]")
    await expect(radio).toBeChecked()
  },
} satisfies Story

const GroupTemplate = (): React.JSX.Element => {
  return (
    <>
      <Radio name="name">Label 1</Radio>
      <Radio name="name">Label 2</Radio>
      <Radio name="name">Label 3</Radio>
    </>
  )
}

export const GroupPointer = {
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
      {[Basic, DefaultChecked].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Radio key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Story
