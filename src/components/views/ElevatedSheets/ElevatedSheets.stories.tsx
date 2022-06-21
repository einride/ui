import { useDisclosure } from "@einride/hooks"
import { Story } from "@storybook/react/types-6-0"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { ElevatedSheets, ElevatedSheetsProps } from "./ElevatedSheets"

export default {
  title: "Views/ElevatedSheets",
  component: ElevatedSheets,
}

const Template: Story<ElevatedSheetsProps> = (args) => {
  const { isOpen, handlers } = useDisclosure(true)

  return (
    <>
      <PrimaryButton onClick={handlers.open}>Open</PrimaryButton>
      <ElevatedSheets
        {...args}
        closeHandler={handlers.close}
        isOpen={isOpen}
        navigationAction={{
          "aria-label": "Close",
          icon: "xMark",
          handler: handlers.close,
        }}
        navigationTitle="Page name"
        primaryAction={{ text: "Primary" }}
        secondaryAction={{ text: "Close", handler: handlers.close }}
      >
        <Paragraph>Sheets content</Paragraph>
      </ElevatedSheets>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  size: "md",
}
