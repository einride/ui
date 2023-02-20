import { Table } from "../components/table/Table/Table"
import { Tbody } from "../components/table/Tbody/Tbody"
import { Td } from "../components/table/Td/Td"
import { Th } from "../components/table/Th/Th"
import { Thead } from "../components/table/Thead/Thead"
import { Tr } from "../components/table/Tr/Tr"
import { report } from "./report"

export default {
  title: "Usage/Usage",
}

export const Components = (): JSX.Element => (
  <Table>
    <Thead color="secondary">
      <Tr>
        <Th scope="col">Component</Th>
        <Th scope="col" textAlign="end">
          Instances
        </Th>
      </Tr>
    </Thead>
    <Tbody>
      {report.map((component) => (
        <Tr key={component.name}>
          <Td>{component.name}</Td>
          <Td textAlign="end">{component.instances}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)
