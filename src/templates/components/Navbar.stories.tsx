import { ComponentMeta } from "@storybook/react"
import { ReactNode } from "react"
import { IconButton } from "../../components/controls/buttons/IconButton/IconButton"
import { PrimaryButton } from "../../components/controls/buttons/PrimaryButton/PrimaryButton"
import { Group } from "../../components/layout/Group/Group"

export default {
  title: "Templates/Wireframes/Navbar",
  args: { style: { paddingBlockStart: 0 } },
} as ComponentMeta<typeof Navbar>

interface NavbarProps {
  actions?: ReactNode
}

export const Navbar = ({
  actions = <PrimaryButton>Invite</PrimaryButton>,
}: NavbarProps): JSX.Element => {
  return (
    <Group as="nav" justifyContent="space-between" paddingBlock={3}>
      <Group alignItems="center" gap="sm">
        <IconButton aria-label="Navigate back" icon="arrowLeft" />
        Page
      </Group>
      <Group>{actions}</Group>
    </Group>
  )
}