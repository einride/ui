import { Meta, Story } from "@storybook/react/types-6-0"
import * as React from "react"
import { Table, TableProps } from "./Table/Table"
import { Tbody } from "./Tbody/Tbody"
import { Td } from "./Td/Td"
import { Th } from "./Th/Th"
import { Thead } from "./Thead/Thead"
import { Tr } from "./Tr/Tr"

export default {
  title: "Table/Table",
  component: Table,
  subcomponents: { Thead, Tr, Th, Td },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=87%3A64",
    },
  },
} as Meta

export const Default: Story<TableProps> = (args) => (
  <Table {...args}>
    <Thead>
      <Tr>
        <Th>Country</Th>
        <Th>Capital</Th>
        <Th>Date format</Th>
        <Th>Internet TLD</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Sweden</Td>
        <Td>Stockholm</Td>
        <Td>YYYY-MM-DD</Td>
        <Td>.se</Td>
      </Tr>
      <Tr>
        <Td>Germany</Td>
        <Td>Berlin</Td>
        <Td>DD.MM.YYYY</Td>
        <Td>.de</Td>
      </Tr>
      <Tr>
        <Td>Brazil</Td>
        <Td>Brasília</Td>
        <Td>DD/MM/YYYY</Td>
        <Td>.br</Td>
      </Tr>
    </Tbody>
  </Table>
)
