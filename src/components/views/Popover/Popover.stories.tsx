import { useDisclosure } from "@einride/hooks"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { Popover } from "./Popover"

export default {
  title: "Views/Popover",
  component: Popover,
} as ComponentMeta<typeof Popover>

const Template: ComponentStory<typeof Popover> = (args) => {
  const { isOpen, handlers } = useDisclosure(true)

  return (
    <>
      <PrimaryButton onClick={handlers.open}>Open</PrimaryButton>

      <Popover
        {...args}
        closeHandler={handlers.close}
        isOpen={isOpen}
        navigationAction={{
          "aria-label": "Close",
          icon: "xMark",
          onClick: handlers.close,
        }}
        primaryAction={{ text: "Primary" }}
        secondaryAction={{ text: "Close", handler: handlers.close }}
      >
        <Paragraph>Popover content</Paragraph>
      </Popover>
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

export const WithTitle = Template.bind({})
WithTitle.args = {
  navigationTitle: "Page name",
}
WithTitle.parameters = parameters
