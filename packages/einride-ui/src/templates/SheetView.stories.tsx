import { useDisclosure } from "@einride/hooks"
import { Meta } from "@storybook/react"
import { PrimaryButton } from "../components/controls/buttons/PrimaryButton/PrimaryButton"
import { TextInput } from "../components/controls/inputs/TextInput/TextInput"
import { Select } from "../components/controls/selects/Select/Select"
import { Box } from "../components/layout/Box/Box"
import { Stack } from "../components/layout/Stack/Stack"
import { VerticalSpacing } from "../components/layout/VerticalSpacing/VerticalSpacing"
import { Text } from "../components/typography/Text/Text"
import { Sheets } from "../components/views/Sheets/Sheets"
import { Navbar } from "./components/Navbar.stories"
import { UserTable } from "./components/UserTable.stories"

const meta = {
  title: "Templates",
  args: { style: { paddingBlockStart: 0 } },
} satisfies Meta

export default meta

export const SheetView = (): React.JSX.Element => {
  const { isOpen, handlers } = useDisclosure(true)

  return (
    <>
      <Box>
        <Navbar actions={<PrimaryButton onClick={handlers.open}>Invite</PrimaryButton>} />
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
      <Sheets
        isOpen={isOpen}
        closeHandler={handlers.close}
        primaryAction={{ children: "Invite user" }}
        secondaryAction={{ children: "Cancel", onClick: handlers.close }}
      >
        <VerticalSpacing size="sm" />
        <Stack gap="sm">
          <TextInput label="Name" />
          <TextInput label="Email" />
          <Select label="Role">
            <option>Owner</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </Select>
        </Stack>
      </Sheets>
    </>
  )
}
