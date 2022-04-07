import { Story } from "@storybook/react/types-6-0"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { PlainSheets, PlainSheetsProps } from "./PlainSheets"

export default {
  title: "Views/PlainSheets",
  component: PlainSheets,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A147",
    },
  },
}

const Template: Story<PlainSheetsProps> = (args) => {
  const { isOpen, handlers } = useDisclosure(true)

  return (
    <div style={{ display: "flex" }}>
      <PrimaryButton isFullWidth onClick={handlers.open}>
        Open
      </PrimaryButton>
      <PlainSheets
        {...args}
        closeHandler={handlers.close}
        isOpen={isOpen}
        primaryAction={{ text: "Primary" }}
        secondaryAction={{ text: "Close", handler: handlers.close }}
      >
        <Paragraph>Sheets content</Paragraph>
      </PlainSheets>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {}
