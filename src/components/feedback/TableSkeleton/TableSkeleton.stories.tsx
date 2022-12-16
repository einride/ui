import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Th } from "../../table/Th/Th"
import { Thead } from "../../table/Thead/Thead"
import { Tr } from "../../table/Tr/Tr"
import { TableSkeleton } from "./TableSkeleton"

export default {
  title: "Feedback/TableSkeleton",
  component: TableSkeleton,
} as ComponentMeta<typeof TableSkeleton>

const Template: ComponentStory<typeof TableSkeleton> = (args) => <TableSkeleton {...args} />

export const Basic = Template.bind({})
Basic.args = {
  columns: 3,
  rows: 6,
}

export const TableHead = Template.bind({})
TableHead.args = {
  columns: 4,
  rows: 10,
  thead: (
    <Thead>
      <Tr color="secondary">
        <Th scope="col">Country</Th>
        <Th scope="col">Capital</Th>
        <Th scope="col">Date format</Th>
        <Th scope="col">Internet TLD</Th>
      </Tr>
    </Thead>
  ),
}
