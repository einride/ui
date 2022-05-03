import { useDisclosure } from "@einride/hooks"
import { Story } from "@storybook/react/types-6-0"
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
    <>
      <PrimaryButton isFullWidth onClick={handlers.open}>
        Open
      </PrimaryButton>
      <PlainSheets
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
      </PlainSheets>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  size: "md",
}
