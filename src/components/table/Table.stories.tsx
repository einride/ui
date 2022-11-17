import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Table } from "./Table/Table"
import { Tbody } from "./Tbody/Tbody"
import { Td } from "./Td/Td"
import { Th } from "./Th/Th"
import { Thead } from "./Thead/Thead"
import { Tr } from "./Tr/Tr"

export default {
  title: "Table/Table",
  component: Table,
} as ComponentMeta<typeof Table>

export const Default: ComponentStory<typeof Table> = (args) => (
  <Table {...args}>
    <Thead>
      <Tr color="secondary">
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

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const table = canvas.getByRole("table")
  await expect(table).toBeInTheDocument()
  const columnHeaders = canvas.getAllByRole("columnheader")
  await expect(columnHeaders).toHaveLength(4)
  const firstColumnHeader = columnHeaders[0]
  await expect(firstColumnHeader).toHaveAccessibleName(/country/i)
  const rowHeaders = canvas.getAllByRole("rowheader")
  await expect(rowHeaders).toHaveLength(3)
  const firstRowHeader = rowHeaders[0]
  await expect(firstRowHeader).toHaveAccessibleName(/sweden/i)
  const cells = canvas.getAllByRole("cell")
  await expect(cells).toHaveLength(9)
  const firstCell = cells[0]
  await expect(firstCell).toHaveAccessibleName(/stockholm/i)
}
