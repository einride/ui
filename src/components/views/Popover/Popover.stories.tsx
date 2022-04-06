import { Story } from "@storybook/react/types-6-0"
import { useDisclosure } from "../../../hooks/useDisclosure"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { Popover, PopoverProps } from "./Popover"

export default {
  title: "Views/Popover",
  component: Popover,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A147",
    },
  },
}

const Template: Story<PopoverProps> = (args) => {
  const { isOpen, handlers } = useDisclosure(true)

  return (
    <>
      <PrimaryButton onClick={handlers.open}>Open</PrimaryButton>

      <Popover
        {...args}
        closeHandler={handlers.close}
        isOpen={isOpen}
        primaryAction={{ text: "Primary" }}
        secondaryAction={{ text: "Close", handler: handlers.close }}
      >
        <Paragraph>Popover content</Paragraph>
      </Popover>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
