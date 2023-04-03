import { Meta, StoryObj } from "@storybook/react"
import { Th } from "../../table/Th/Th"
import { Thead } from "../../table/Thead/Thead"
import { Tr } from "../../table/Tr/Tr"
import { TableSkeleton } from "./TableSkeleton"

/** A utilify component for making table skeletons in a simple way. */
const meta = {
  component: TableSkeleton,
  argTypes: {
    thead: {
      control: false,
    },
  },
} satisfies Meta<typeof TableSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    columns: 3,
    rows: 6,
  },
} satisfies Story

/** In many cases, the table head is known before the rows are loaded. Showing the table head from the start is a way to reduce unnecessary layout shifts. */
export const TableHead = {
  args: {
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
  },
} satisfies Story
