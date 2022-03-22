import { Story } from "@storybook/react/types-6-0"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { HorizontalLayout, HorizontalLayoutProps } from "./HorizontalLayout"

export default {
  title: "Layout/HorizontalLayout",
  component: HorizontalLayout,
  parameters: {
    design: {
      // TODO: add correct link to Figma
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=4%3A16",
    },
  },
}

const Template: Story<HorizontalLayoutProps> = (args) => (
  <HorizontalLayout {...args}>
    <Paragraph>Row 1</Paragraph>
    <Paragraph>Row 2</Paragraph>
    <PrimaryButton>Row 3</PrimaryButton>
  </HorizontalLayout>
)

export const Default = Template.bind({})
Default.args = {}

export const None = Template.bind({})
None.args = {
  gap: "none",
}

export const Small = Template.bind({})
Small.args = {
  gap: "sm",
}

export const Large = Template.bind({})
Large.args = {
  gap: "lg",
}
