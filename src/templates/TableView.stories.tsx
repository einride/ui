import { Meta } from "@storybook/react"
import { Box } from "../components/layout/Box/Box"
import { VerticalSpacing } from "../components/layout/VerticalSpacing/VerticalSpacing"
import { Text } from "../components/typography/Text/Text"
import { Navbar } from "./components/Navbar.stories"
import { UserTable } from "./components/UserTable.stories"

export default {
  args: { style: { paddingBlockStart: 0 } },
} satisfies Meta

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
    <UserTable />
  </Box>
)
