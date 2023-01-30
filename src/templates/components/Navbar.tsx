import { IconButton } from "../../components/controls/buttons/IconButton/IconButton"
import { PrimaryButton } from "../../components/controls/buttons/PrimaryButton/PrimaryButton"
import { Group } from "../../components/layout/Group/Group"

export const Navbar = (): JSX.Element => {
  return (
    <Group as="nav" justifyContent="space-between" paddingBlock={3}>
      <Group alignItems="center" gap="sm">
        <IconButton aria-label="Navigate back" icon="arrowLeft" />
        Page
      </Group>
      <Group>
        <PrimaryButton>Invite</PrimaryButton>
      </Group>
    </Group>
  )
}
