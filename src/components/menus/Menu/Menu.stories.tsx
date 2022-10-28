import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { Icon } from "../../content/Icon/Icon"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { Table } from "../../table/Table/Table"
import { Tbody } from "../../table/Tbody/Tbody"
import { Td } from "../../table/Td/Td"
import { Th } from "../../table/Th/Th"
import { Thead } from "../../table/Thead/Thead"
import { Tr } from "../../table/Tr/Tr"
import { Menu } from "./Menu"
import { MenuContent } from "./MenuContent"
import { MenuItem } from "./MenuItem"
import { MenuTrigger } from "./MenuTrigger"

export default {
  title: "Menus/Menu",
  component: Menu,
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuTrigger>
      <IconButton aria-label="See options" icon="ellipsis" />
    </MenuTrigger>
    <MenuContent>
      <MenuItem icon={<Icon name="arrowDownCircle" />}>Option 1</MenuItem>
      <MenuItem icon={<Icon name="arrowDownCircle" />}>Option 2</MenuItem>
      <MenuItem>Option 3</MenuItem>
      <MenuItem>Option 4</MenuItem>
    </MenuContent>
  </Menu>
)

export const Default = Template.bind({})
Default.args = {}

const founders = [
  { key: "robert", firstName: "Robert", lastName: "Falck" },
  { key: "linnea", firstName: "Linnéa", lastName: "Kornehed Falck" },
  { key: "filip", firstName: "Filip", lastName: "Lilja" },
]

const InTableTemlate: ComponentStory<typeof Menu> = (args) => (
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
            <Menu {...args}>
              <MenuTrigger>
                <IconButton aria-label="See options" icon="ellipsis" />
              </MenuTrigger>
              <MenuContent>
                <MenuItem icon={<Icon name="arrowDownCircle" />}>Option 1</MenuItem>
                <MenuItem icon={<Icon name="arrowDownCircle" />}>Option 2</MenuItem>
                <MenuItem>Option 3</MenuItem>
                <MenuItem>Option 4</MenuItem>
              </MenuContent>
            </Menu>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)

export const InTable = InTableTemlate.bind({})
InTableTemlate.args = {}

export const Pointer = Default.bind({})
Pointer.args = {}
Pointer.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const button = canvas.getByRole("button")
  await userEvent.click(button)
  const menu = canvas.getByRole("menu")
  await expect(menu).toBeInTheDocument()
  const firstItem = canvas.getByRole("menuitem", { name: "Option 1" })
  await expect(firstItem).toBeInTheDocument()
  await userEvent.click(firstItem)
  await expect(menu).not.toBeInTheDocument()
}
