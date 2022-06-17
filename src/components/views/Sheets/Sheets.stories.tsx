import { useDisclosure } from "@einride/hooks"
import { Story } from "@storybook/react/types-6-0"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { Sheets, SheetsProps } from "./Sheets"

export default {
  title: "Views/Sheets",
  component: Sheets,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A147",
    },
  },
}

const Template: Story<SheetsProps> = (args) => {
  const { isOpen, handlers } = useDisclosure(true)

  return (
    <>
      <PrimaryButton onClick={handlers.open}>Open</PrimaryButton>
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
        secondaryAction={{ children: "Close", onClick: handlers.close }}
      >
        <Paragraph>Sheets content</Paragraph>
      </Sheets>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  size: "md",
}
