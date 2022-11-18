import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { Radio } from "./Radio"

export default {
  title: "Controls/Radios/Radio",
  component: Radio,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Radio>

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Label",
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const radio = canvas.getByRole("radio")
  await expect(radio).toHaveAccessibleName(/label/i)
  await expect(radio).not.toBeChecked()
  await userEvent.click(radio)
  await expect(radio).toBeChecked()
}

export const Controlled = Template.bind({})
Controlled.args = {
  checked: true,
  children: "Label",
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const radio = canvas.getByRole("radio")
  await expect(radio).toHaveAccessibleName(/label/i)
  await expect(radio).toBeChecked()
}

const GroupTemplate: ComponentStory<typeof Radio> = () => {
  return (
    <>
      <Radio name="name">Label 1</Radio>
      <Radio name="name">Label 2</Radio>
      <Radio name="name">Label 3</Radio>
    </>
  )
}

export const Group = GroupTemplate.bind({})
Group.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const radio1 = canvas.getByRole("radio", { name: "Label 1" })
  const radio2 = canvas.getByRole("radio", { name: "Label 2" })
  const radio3 = canvas.getByRole("radio", { name: "Label 3" })
  await expect(radio1).toHaveAccessibleName(/label 1/i)
  await expect(radio2).toHaveAccessibleName(/label 2/i)
  await expect(radio3).toHaveAccessibleName(/label 3/i)
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
}

export const Keyboard = GroupTemplate.bind({})
Keyboard.play = async ({ canvasElement }) => {
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
}
