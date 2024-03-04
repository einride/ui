import { useDisclosure } from "@einride/hooks"
import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Menu } from "../../menus/Menu/Menu"
import { MenuContent } from "../../menus/Menu/MenuContent"
import { MenuItem } from "../../menus/Menu/MenuItem"
import { MenuTrigger } from "../../menus/Menu/MenuTrigger"
import { Text } from "../../typography/Text/Text"
import { Sheets } from "./Sheets"

const meta = {
  component: Sheets,
} satisfies Meta<typeof Sheets>

export default meta // TODO: Make possible to use uncontrolled

interface TemplateProps {
  defaultOpen?: boolean
  modal?: boolean
}

const Template = ({ defaultOpen = false, modal = true }: TemplateProps): React.JSX.Element => {
  const { isOpen, handlers } = useDisclosure(defaultOpen)
  return (
    <>
      <PrimaryButton onClick={handlers.open}>Open sheets</PrimaryButton>
      <Sheets
        closeHandler={handlers.close}
        isOpen={isOpen}
        navigationAction={{
          "aria-label": "Close",
          icon: "xMark",
          onClick: handlers.close,
        }}
        modal={modal}
        navigationTitle="Page name"
        primaryAction={{ children: "Primary" }}
      >
        <Text>Sheets content</Text>
      </Sheets>
    </>
  )
}

export const Basic = {
  render: () => <Template defaultOpen />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement ?? canvasElement)
    const alert = canvas.getByRole("dialog")
    await expect(alert).toBeInTheDocument()
  },
} satisfies StoryObj

export const NonModal = {
  render: () => <Template modal={false} defaultOpen />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement ?? canvasElement)
    const alert = canvas.getByRole("dialog")
    await expect(alert).toBeInTheDocument()
  },
} satisfies StoryObj

export const Pointer = {
  render: () => <Template />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement ?? canvasElement)
    const openButton = canvas.getByRole("button", { name: "Open sheets" })
    await userEvent.click(openButton)
    const dialog = canvas.getByRole("dialog")
    await expect(dialog).toBeInTheDocument()
    await expect(openButton).toHaveStyle("pointer-events: none")
    const closeButton = canvas.getByRole("button", { name: "Close" })
    await userEvent.click(closeButton)
    await expect(dialog).not.toBeInTheDocument()
  },
} satisfies StoryObj

export const Keyboard = {
  render: () => <Template />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement ?? canvasElement)
    const openButton = canvas.getByRole("button", { name: "Open sheets" })
    await expect(openButton).not.toHaveFocus()
    await userEvent.tab()
    await expect(openButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    const dialog = canvas.getByRole("dialog")
    await expect(dialog).toBeInTheDocument()
    const closeButton = canvas.getByRole("button", { name: "Close" })
    await expect(closeButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await expect(dialog).not.toBeInTheDocument()
  },
} satisfies StoryObj

const ContextMenuTemplate = (): React.JSX.Element => {
  const { isOpen, handlers } = useDisclosure(true)
  return (
    <>
      <Menu>
        <MenuTrigger>
          <IconButton aria-label="See options" icon="ellipsis" />
        </MenuTrigger>
        <MenuContent>
          <MenuItem onClick={handlers.open}>Option 1</MenuItem>
          <MenuItem onClick={handlers.open}>Option 2</MenuItem>
        </MenuContent>
      </Menu>
      <Sheets
        closeHandler={handlers.close}
        isOpen={isOpen}
        navigationAction={{
          "aria-label": "Close",
          icon: "xMark",
          onClick: handlers.close,
        }}
        navigationTitle="Page name"
        primaryAction={{ children: "Primary" }}
      >
        <Text>Sheets content</Text>
      </Sheets>
    </>
  )
}

export const ContextMenu = {
  render: () => <ContextMenuTemplate />,
} satisfies StoryObj
