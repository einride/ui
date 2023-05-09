import { useDisclosure } from "@einride/hooks"
import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Alert } from "./Alert"

const meta = {
  component: Alert,
} satisfies Meta<typeof Alert>

export default meta // TODO: Make possible to you uncontrolled

interface TemplateProps {
  defaultOpen?: boolean
}

const Template = ({ defaultOpen = false }: TemplateProps): React.JSX.Element => {
  const { isOpen, handlers } = useDisclosure(defaultOpen)
  return (
    <>
      <PrimaryButton onClick={handlers.open}>Open alert</PrimaryButton>
      <Alert
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

export const Basic = {
  render: () => <Template defaultOpen />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement ?? canvasElement)
    const alert = canvas.getByRole("alertdialog", { name: "Title" })
    await expect(alert).toHaveAccessibleDescription(
      "Secondary, supporting text that should span to a maximum of 2-3 lines and no more than that.",
    )
  },
} satisfies StoryObj

export const Pointer = {
  render: () => <Template />,
  play: async ({ canvasElement }) => {
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
  },
} satisfies StoryObj

export const Keyboard = {
  render: () => <Template />,
  play: async ({ canvasElement }) => {
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
  },
} satisfies StoryObj
