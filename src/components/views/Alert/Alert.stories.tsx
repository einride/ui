import { useDisclosure } from "@einride/hooks"
import { Story } from "@storybook/react/types-6-0"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { Alert, AlertProps } from "./Alert"

export default {
  title: "Views/Alert",
  component: Alert,
}

const Template: Story<AlertProps> = (args) => {
  const { isOpen, handlers } = useDisclosure(true)

  return (
    <>
      <PrimaryButton onClick={handlers.open}>Open</PrimaryButton>

      <Alert
        {...args}
        closeHandler={handlers.close}
        isOpen={isOpen}
        primaryAction={{ children: "Delete customer" }}
        secondaryAction={{ children: "Cancel", onClick: handlers.close }}
      >
        <Paragraph>Delete organization</Paragraph>
        <Paragraph color="secondary">
          Are you sure? You won&apos;t be able to undo this action.
        </Paragraph>
      </Alert>
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
