import { faker } from "@faker-js/faker"
import { Meta } from "@storybook/react"
import { Icon } from "../../components/content/Icon/Icon"
import { IconButton } from "../../components/controls/buttons/IconButton/IconButton"
import { Menu } from "../../components/menus/Menu/Menu"
import { MenuContent } from "../../components/menus/Menu/MenuContent"
import { MenuItem } from "../../components/menus/Menu/MenuItem"
import { MenuTrigger } from "../../components/menus/Menu/MenuTrigger"
import { Table } from "../../components/table/Table/Table"
import { Tbody } from "../../components/table/Tbody/Tbody"
import { Td } from "../../components/table/Td/Td"
import { Th } from "../../components/table/Th/Th"
import { Thead } from "../../components/table/Thead/Thead"
import { Tr } from "../../components/table/Tr/Tr"

const meta = {
  title: "Templates/Wireframes/UserTable",
  args: { style: { paddingBlockStart: 0 } },
} satisfies Meta

export default meta

function createRandomUser(): {
  id: string
  name: string
  email: string
  number: number
  role: string
} {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    number: faker.datatype.float(),
    role: faker.helpers.arrayElement(["Owner", "Admin", "Editor", "Viewer"]),
  }
}

const users = Array.from({ length: 20 }).map(() => createRandomUser())

export const UserTable = (): React.JSX.Element => (
  <Table>
    <Thead>
      <Tr color="secondary">
        <Th scope="row">User</Th>
        <Th scope="row">Email</Th>
        <Th scope="row">Role</Th>
        <Th scope="row" textAlign="end">
          Number
        </Th>
      </Tr>
    </Thead>
    <Tbody>
      {users.map((user) => (
        <Tr key={user.id}>
          <Td>{user.name}</Td>
          <Td>{user.email}</Td>
          <Td>{user.role}</Td>
          <Td textAlign="end">{user.number}</Td>
          <Td textAlign="end">
            <Menu>
              <MenuTrigger>
                <IconButton aria-label={`${user.name} options`} icon="ellipsis" />
              </MenuTrigger>
              <MenuContent>
                <MenuItem icon={<Icon name="arrowRight" />}>Label</MenuItem>
                <MenuItem icon={<Icon name="arrowRight" />}>Label</MenuItem>
              </MenuContent>
            </Menu>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)
