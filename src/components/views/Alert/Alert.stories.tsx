import { useDisclosure } from "@einride/hooks"
import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Alert } from "./Alert"

export default {
  title: "Views/Alert",
  component: Alert,
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = (args) => {
  const { isOpen, handlers } = useDisclosure(true)
  return (
    <>
      <PrimaryButton onClick={handlers.open}>Open alert</PrimaryButton>
      <Alert
        {...args}
        closeHandler={handlers.close}
        description="Secondary, supporting text that should span to a maximum of 2-3 lines and no more than that."
        isOpen={isOpen}
        primaryAction={{ children: "Primary" }}
        secondaryAction={{ children: "Secondary", onClick: handlers.close }}
        title="Title"
      />
    </>
  )
}

export const Basic = Template.bind({})
Basic.args = {}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const alert = canvas.getByRole("alertdialog", { name: "Title" })
  await expect(alert).toHaveAccessibleDescription(
    "Secondary, supporting text that should span to a maximum of 2-3 lines and no more than that.",
  )
}

const NavigationTemplate: ComponentStory<typeof Alert> = (args) => {
  const { isOpen, handlers } = useDisclosure(false)
  return (
    <>
      <PrimaryButton onClick={handlers.open}>Open alert</PrimaryButton>
      <Alert
        {...args}
        closeHandler={handlers.close}
        description="Secondary, supporting text that should span to a maximum of 2-3 lines and no more than that."
        isOpen={isOpen}
        primaryAction={{ children: "Primary" }}
        secondaryAction={{ children: "Secondary", onClick: handlers.close }}
        title="Title"
      />
    </>
  )
}

export const Mouse = NavigationTemplate.bind({})
Mouse.args = {}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const openButton = canvas.getByRole("button", { name: "Open alert" })
  await userEvent.click(openButton)
  const alert = canvas.getByRole("alertdialog", { name: "Title" })
  await expect(alert).toHaveAccessibleDescription(
    "Secondary, supporting text that should span to a maximum of 2-3 lines and no more than that.",
  )
  await expect(openButton).toHaveStyle("pointer-events: none")
  const secondaryButton = canvas.getByRole("button", { name: "Secondary" })
  await userEvent.click(secondaryButton)
  await expect(alert).not.toBeInTheDocument()
}

export const Keyboard = NavigationTemplate.bind({})
Keyboard.args = {}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement ?? canvasElement)
  const openButton = canvas.getByRole("button", { name: "Open alert" })
  await expect(openButton).not.toHaveFocus()
  await userEvent.tab()
  await expect(openButton).toHaveFocus()
  await userEvent.keyboard("[Enter]")
  const alert = canvas.getByRole("alertdialog", { name: "Title" })
  await expect(alert).toHaveAccessibleDescription(
    "Secondary, supporting text that should span to a maximum of 2-3 lines and no more than that.",
  )
  const secondaryButton = canvas.getByRole("button", { name: "Secondary" })
  await expect(secondaryButton).toHaveFocus()
  await userEvent.keyboard("[Enter]")
  await expect(alert).not.toBeInTheDocument()
}
