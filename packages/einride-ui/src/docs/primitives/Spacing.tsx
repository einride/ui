import { useTheme } from "@emotion/react"
import { Box } from "../../components/layout/Box/Box"
import { Table } from "../../components/table/Table/Table"
import { Tbody } from "../../components/table/Tbody/Tbody"
import { Td } from "../../components/table/Td/Td"
import { Th } from "../../components/table/Th/Th"
import { Thead } from "../../components/table/Thead/Thead"
import { Tr } from "../../components/table/Tr/Tr"
import { getSpacing } from "../../lib/theme/prop-system"
import { spacings } from "../../lib/theme/types"

export const Spacing = (): JSX.Element => {
  const theme = useTheme()
  return (
    <Table>
      <Thead>
        <Tr>
          <Th scope="col">Name</Th>
          <Th scope="col">Size</Th>
          <Th scope="col">Pixels</Th>
          <Th scope="col" />
        </Tr>
      </Thead>
      <Tbody>
        {spacings.map((spacing) => (
          <Tr key={spacing}>
            <Td>{spacing}</Td>
            <Td>{getSpacing(spacing, theme)}</Td>
            <Td>{`${Number(getSpacing(spacing, theme).split("rem")[0]) * 16}px`}</Td>
            <Td>
              <Box background="positive" blockSize={2} inlineSize={getSpacing(spacing, theme)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
