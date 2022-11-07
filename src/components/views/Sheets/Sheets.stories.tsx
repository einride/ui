import { useDisclosure } from "@einride/hooks"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { Sheets } from "./Sheets"

export default {
  title: "Views/Sheets",
  component: Sheets,
} as ComponentMeta<typeof Sheets>

const Template: ComponentStory<typeof Sheets> = (args) => {
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

const parameters = {
  controls: {
    exclude: /on*/,
  },
}

export const Default = Template.bind({})
Default.args = {
  size: "md",
}
Default.parameters = parameters
