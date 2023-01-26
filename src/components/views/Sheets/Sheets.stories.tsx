import { useDisclosure } from "@einride/hooks"
import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import * as Menu from "../../menus/Menu"
import { Text } from "../../typography/Text/Text"
import { Sheets } from "./Sheets"

export default {
  title: "Views/Sheets",
  component: Sheets,
} as ComponentMeta<typeof Sheets>

const Template: ComponentStory<typeof Sheets> = (args) => {
  const { isOpen, handlers } = useDisclosure(true)
  return (
    <>
      <PrimaryButton onClick={handlers.open}>Open sheets</PrimaryButton>
      <Sheets
        {...args}
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

export const Basic = Template.bind({})
Basic.args = {}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const alert = canvas.getByRole("dialog")
  await expect(alert).toBeInTheDocument()
}

export const NonModal = Template.bind({})
NonModal.args = {
  modal: false,
}
NonModal.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const alert = canvas.getByRole("dialog")
  await expect(alert).toBeInTheDocument()
}

const NavigationTemplate: ComponentStory<typeof Sheets> = (args) => {
  const { isOpen, handlers } = useDisclosure(false)
  return (
    <>
      <PrimaryButton onClick={handlers.open}>Open sheets</PrimaryButton>
      <Sheets
        {...args}
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

export const Mouse = NavigationTemplate.bind({})
Mouse.args = {}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const openButton = canvas.getByRole("button", { name: "Open sheets" })
  await userEvent.click(openButton)
  const dialog = canvas.getByRole("dialog")
  await expect(dialog).toBeInTheDocument()
  await expect(openButton).toHaveStyle("pointer-events: none")
  const closeButton = canvas.getByRole("button", { name: "Close" })
  await userEvent.click(closeButton)
  await expect(dialog).not.toBeInTheDocument()
}

export const Keyboard = NavigationTemplate.bind({})
Keyboard.args = {}
Keyboard.play = async ({ canvasElement }) => {
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
}

const ContextMenuTemplate: ComponentStory<typeof Sheets> = (args) => {
  const { isOpen, handlers } = useDisclosure(true)
  return (
    <>
      <Menu.Root>
        <Menu.Trigger>
          <IconButton aria-label="See options" icon="ellipsis" />
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item onClick={handlers.open}>Option 1</Menu.Item>
          <Menu.Item onClick={handlers.open}>Option 2</Menu.Item>
        </Menu.Content>
      </Menu.Root>
      <Sheets
        {...args}
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

export const ContextMenu = ContextMenuTemplate.bind({})
ContextMenu.args = {}
