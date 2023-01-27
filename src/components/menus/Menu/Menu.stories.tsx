import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Icon } from "../../content/Icon/Icon"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { Table } from "../../table/Table/Table"
import { Tbody } from "../../table/Tbody/Tbody"
import { Td } from "../../table/Td/Td"
import { Th } from "../../table/Th/Th"
import { Thead } from "../../table/Thead/Thead"
import { Tr } from "../../table/Tr/Tr"
import * as Menu from "./index"

export default {
  title: "Menus/Menu",
  component: Menu.Root,
} as ComponentMeta<typeof Menu.Root>

const Template: ComponentStory<typeof Menu.Root> = (args) => (
  <Menu.Root {...args}>
    <Menu.Trigger>
      <IconButton aria-label="See options" icon="ellipsis" />
    </Menu.Trigger>
    <Menu.Content>
      <Menu.Item icon={<Icon name="arrowDownCircle" />}>Option 1</Menu.Item>
      <Menu.Item icon={<Icon name="arrowDownCircle" />}>Option 2</Menu.Item>
      <Menu.Item>Option 3</Menu.Item>
      <Menu.Item>Option 4</Menu.Item>
    </Menu.Content>
  </Menu.Root>
)

export const Basic = Template.bind({})
Basic.args = {}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const button = canvas.getByRole("button", { name: "See options" })
  await expect(button).toBeInTheDocument()
}

export const DefaultOpen = Template.bind({})
DefaultOpen.args = {
  defaultOpen: true,
}
DefaultOpen.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const menu = canvas.getByRole("menu", { name: "See options" })
  await expect(menu).toBeInTheDocument()
}

const ControlledTemplate: ComponentStory<typeof Menu.Root> = (args) => {
  const [open, setOpen] = useState(false)
  return (
    <Menu.Root {...args} isOpen={open} onOpenChange={setOpen}>
      <Menu.Trigger>
        <IconButton aria-label="See options" icon="ellipsis" />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item icon={<Icon name="arrowDownCircle" />}>Option 1</Menu.Item>
        <Menu.Item icon={<Icon name="arrowDownCircle" />}>Option 2</Menu.Item>
        <Menu.Item>Option 3</Menu.Item>
        <Menu.Item>Option 4</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  )
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const button = canvas.getByRole("button", { name: "See options" })
  await expect(button).toBeInTheDocument()
}

const founders = [
  { key: "robert", firstName: "Robert", lastName: "Falck" },
  { key: "linnea", firstName: "Linnéa", lastName: "Kornehed Falck" },
  { key: "filip", firstName: "Filip", lastName: "Lilja" },
]

const InTableTemlate: ComponentStory<typeof Menu.Root> = (args) => (
  <Table>
    <Thead>
      <Tr>
        <Th scope="col">First name</Th>
        <Th scope="col">Last name</Th>
        <Th scope="col" />
      </Tr>
    </Thead>
    <Tbody>
      {founders.map((founder) => (
        <Tr key={founder.key}>
          <Td>{founder.firstName}</Td>
          <Td>{founder.lastName}</Td>
          <Td textAlign="end">
            <Menu.Root {...args}>
              <Menu.Trigger>
                <IconButton aria-label="See options" icon="ellipsis" />
              </Menu.Trigger>
              <Menu.Content>
                <Menu.Item icon={<Icon name="arrowDownCircle" />}>Option 1</Menu.Item>
                <Menu.Item icon={<Icon name="arrowDownCircle" />}>Option 2</Menu.Item>
                <Menu.Item>Option 3</Menu.Item>
                <Menu.Item>Option 4</Menu.Item>
              </Menu.Content>
            </Menu.Root>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)

export const InTable = InTableTemlate.bind({})
InTable.args = {}
InTable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const buttons = canvas.getAllByRole("button", { name: "See options" })
  expect(buttons).toHaveLength(3)
}

export const Mouse = Template.bind({})
Mouse.args = {}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const button = canvas.getByRole("button", { name: "See options" })
  await userEvent.click(button)
  const menu = canvas.getByRole("menu", { name: "See options" })
  await expect(menu).toBeInTheDocument()
  const firstItem = canvas.getByRole("menuitem", { name: "Option 1" })
  await expect(firstItem).toBeInTheDocument()
  await userEvent.click(firstItem)
  await expect(menu).not.toBeInTheDocument()
}

export const Keyboard = ControlledTemplate.bind({})
Keyboard.args = {}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const button = canvas.getByRole("button", { name: "See options" })
  await expect(button).not.toHaveFocus()
  await userEvent.tab()
  await expect(button).toHaveFocus()
  await userEvent.keyboard("[Enter]")
  const firstItem = canvas.getByRole("menuitem", { name: "Option 1" })
  await expect(firstItem).toHaveFocus()
  await userEvent.keyboard("[ArrowDown]")
  const secondItem = canvas.getByRole("menuitem", { name: "Option 2" })
  await expect(secondItem).toHaveFocus()
  await userEvent.keyboard("[Enter]")
  await expect(button).toHaveFocus()
  await userEvent.keyboard("[Enter]")
  const thirdItem = canvas.getByRole("menuitem", { name: "Option 3" })
  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[ArrowDown]")
  await expect(thirdItem).toHaveFocus()
  await userEvent.keyboard("[Escape]")
  await expect(button).toHaveFocus()
}
