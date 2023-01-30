import { faker } from "@faker-js/faker"
import { Icon } from "../components/content/Icon/Icon"
import { IconButton } from "../components/controls/buttons/IconButton/IconButton"
import { Box } from "../components/layout/Box/Box"
import { VerticalSpacing } from "../components/layout/VerticalSpacing/VerticalSpacing"
import * as Menu from "../components/menus/Menu"
import { Table } from "../components/table/Table/Table"
import { Tbody } from "../components/table/Tbody/Tbody"
import { Td } from "../components/table/Td/Td"
import { Th } from "../components/table/Th/Th"
import { Thead } from "../components/table/Thead/Thead"
import { Tr } from "../components/table/Tr/Tr"
import { Text } from "../components/typography/Text/Text"
import { Navbar } from "./components/Navbar/Navbar"

export default {
  title: "Templates",
  args: { style: { paddingBlockStart: 0 } },
}

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

export const TableView = (): JSX.Element => (
  <Box>
    <Navbar />
    <VerticalSpacing />
    <Text as="h1" variant="titleLg">
      Title
    </Text>
    <Text as="h2" color="secondary" variant="titleLg">
      Subtitle
    </Text>
    <VerticalSpacing size="lg" />
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
              <Menu.Root>
                <Menu.Trigger>
                  <IconButton aria-label={`${user.name} options`} icon="ellipsis" />
                </Menu.Trigger>
                <Menu.Content>
                  <Menu.Item icon={<Icon name="arrowRight" />}>Label</Menu.Item>
                  <Menu.Item icon={<Icon name="arrowRight" />}>Label</Menu.Item>
                </Menu.Content>
              </Menu.Root>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
)
