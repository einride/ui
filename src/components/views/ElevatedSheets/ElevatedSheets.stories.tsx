import { Story } from "@storybook/react/types-6-0"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { ElevatedSheets, ElevatedSheetsProps } from "./ElevatedSheets"

export default {
  title: "Views/ElevatedSheets",
  component: ElevatedSheets,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A147",
    },
  },
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
