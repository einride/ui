import { useDisclosure } from "@einride/hooks"
import { ComponentMeta, ComponentStory } from "@storybook/react"
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
      <PrimaryButton onClick={handlers.open}>Delete organization</PrimaryButton>
      <Alert
        {...args}
        closeHandler={handlers.close}
        description="Are you sure? You won't be able to undo this action."
        isOpen={isOpen}
        primaryAction={{ children: "Delete" }}
        secondaryAction={{ children: "Cancel", onClick: handlers.close }}
        title="Delete organization"
      />
    </>
  )
}

const parameters = {
  controls: {
    exclude: /on*/,
  },
}

export const Default = Template.bind({})
Default.args = {}
Default.parameters = parameters
