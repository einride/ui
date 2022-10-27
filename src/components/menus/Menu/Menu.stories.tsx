import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Icon } from "../../content/Icon/Icon"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { Table } from "../../table/Table/Table"
import { Tbody } from "../../table/Tbody/Tbody"
import { Td } from "../../table/Td/Td"
import { Th } from "../../table/Th/Th"
import { Thead } from "../../table/Thead/Thead"
import { Tr } from "../../table/Tr/Tr"
import { Menu } from "./Menu"
import { MenuDropdown } from "./MenuDropdown"
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
    <MenuDropdown>
      <MenuItem icon={<Icon name="arrowDownCircle" />}>Option 1</MenuItem>
      <MenuItem icon={<Icon name="arrowDownCircle" />}>Option 2</MenuItem>
      <MenuItem>Option 3</MenuItem>
      <MenuItem>Option 4</MenuItem>
    </MenuDropdown>
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
          <Td style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
            <Menu {...args} dropdownPosition="bottom-end">
              <MenuTrigger>
                <IconButton aria-label="See options" icon="ellipsis" />
              </MenuTrigger>
              <MenuDropdown>
                <MenuItem icon={<Icon name="arrowDownCircle" />}>Option 1</MenuItem>
                <MenuItem icon={<Icon name="arrowDownCircle" />}>Option 2</MenuItem>
                <MenuItem>Option 3</MenuItem>
                <MenuItem>Option 4</MenuItem>
              </MenuDropdown>
            </Menu>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)

export const InTable = InTableTemlate.bind({})
Default.args = {}
