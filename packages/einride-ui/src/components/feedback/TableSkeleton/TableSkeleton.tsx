import { ReactNode } from "react"
import { Table } from "../../table/Table/Table"
import { Tbody } from "../../table/Tbody/Tbody"
import { Td } from "../../table/Td/Td"
import { Thead } from "../../table/Thead/Thead"
import { Tr } from "../../table/Tr/Tr"
import { Skeleton } from "../Skeleton/Skeleton"

interface TableSkeletonProps {
  /** Number of table columns for the generated table skeleton. */
  columns: number

  /** Number of table rows for the generated table skeleton. */
  rows: number

  /** Avoids swapping content that is already available. Pass the same thead that's used for the loaded table. */
  thead?: ReactNode
}

export const TableSkeleton = ({ columns, rows, thead }: TableSkeletonProps): JSX.Element => {
  return (
    <Table>
      {thead ?? (
        <Thead>
          <Tr color="secondary">
            {[...Array(columns)].map((_columnValue, columnIndex) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Td key={columnIndex}>
                  <Skeleton height="lg" />
                </Td>
              )
            })}
          </Tr>
        </Thead>
      )}
      <Tbody>
        {[...Array(rows)].map((_rowValue, rowIndex) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Tr key={rowIndex}>
              {[...Array(columns)].map((_columnValue, columnIndex) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Td key={columnIndex}>
                    <Skeleton height="lg" />
                  </Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
