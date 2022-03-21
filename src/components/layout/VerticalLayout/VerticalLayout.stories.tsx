import { Story } from "@storybook/react/types-6-0"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { VerticalLayout, VerticalLayoutProps } from "./VerticalLayout"

export default {
  title: "Layout/VerticalLayout",
  component: VerticalLayout,
  parameters: {
    design: {
      // TODO: add correct link to Figma
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=4%3A16",
    },
  },
}

const Template: Story<VerticalLayoutProps> = (args) => (
  <VerticalLayout {...args}>
    <Paragraph>Row 1</Paragraph>
    <Paragraph>Row 2</Paragraph>
    <PrimaryButton>Row 3</PrimaryButton>
  </VerticalLayout>
)

export const Default = Template.bind({})
Default.args = {}

export const None = Template.bind({})
None.args = {
  size: "none",
}

export const ExtraSmall = Template.bind({})
ExtraSmall.args = {
  size: "xs",
}

export const Small = Template.bind({})
Small.args = {
  size: "sm",
}

export const Medium = Template.bind({})
Medium.args = {
  size: "md",
}

export const Large = Template.bind({})
Large.args = {
  size: "lg",
}

export const ExtraLarge = Template.bind({})
ExtraLarge.args = {
  size: "xl",
}
