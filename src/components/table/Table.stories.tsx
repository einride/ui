import { Story } from "@storybook/react/types-6-0"
import { Table, TableProps } from "./Table/Table"
import { Tbody } from "./Tbody/Tbody"
import { Td } from "./Td/Td"
import { Th } from "./Th/Th"
import { Thead } from "./Thead/Thead"
import { Tr } from "./Tr/Tr"

export default {
  title: "Table/Table",
  component: Table,
}

export const Default: Story<TableProps> = (args) => (
  <Table {...args}>
    <Thead>
      <Tr>
        <Th scope="col">Country</Th>
        <Th scope="col">Capital</Th>
        <Th scope="col">Date format</Th>
        <Th scope="col">Internet TLD</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Th scope="row">Sweden</Th>
        <Td>Stockholm</Td>
        <Td>YYYY-MM-DD</Td>
        <Td>.se</Td>
      </Tr>
      <Tr>
        <Th scope="row">Germany</Th>
        <Td>Berlin</Td>
        <Td>DD.MM.YYYY</Td>
        <Td>.de</Td>
      </Tr>
      <Tr>
        <Th scope="row">Brazil</Th>
        <Td>Brasília</Td>
        <Td>DD/MM/YYYY</Td>
        <Td>.br</Td>
      </Tr>
    </Tbody>
  </Table>
)
