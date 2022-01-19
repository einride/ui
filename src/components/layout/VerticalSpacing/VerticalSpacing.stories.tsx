import { Story } from "@storybook/react/types-6-0"
import { VerticalSpacing, VerticalSpacingProps } from "./VerticalSpacing"

export default {
  title: "Layout/VerticalSpacing",
  component: VerticalSpacing,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/zX0qOVghVidk8vWZdd2nwO/Primitives?node-id=1%3A203",
    },
    docs: {
      description: {
        component:
          "Apply outline to the component to see behavior. Outline can be applied in the canvas settings.",
      },
    },
  },
}

const Template: Story<VerticalSpacingProps> = (args) => (
  <VerticalSpacing {...args} />
)

export const Default = Template.bind({})
Default.args = {}

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
