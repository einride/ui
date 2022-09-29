import { useDisclosure } from "@einride/hooks"
import { Story } from "@storybook/react/types-6-0"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
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
        description={<>Are you sure? You won&apos;t be able to undo this action.</>}
        isOpen={isOpen}
        primaryAction={{ children: "Delete organization" }}
        secondaryAction={{ children: "Cancel", onClick: handlers.close }}
        title={<>Delete organization</>}
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
