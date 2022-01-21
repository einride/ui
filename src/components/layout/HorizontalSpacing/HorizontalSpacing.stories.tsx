import { Story } from "@storybook/react/types-6-0"
import { HorizontalSpacing, HorizontalSpacingProps } from "./HorizontalSpacing"

export default {
  title: "Layout/HorizontalSpacing",
  component: HorizontalSpacing,
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

const Template: Story<HorizontalSpacingProps> = (args) => (
  <HorizontalSpacing {...args} />
)

export const Default = Template.bind({})
Default.args = {}

export const Small = Template.bind({})
Small.args = {
  size: "sm",
}

export const Large = Template.bind({})
Large.args = {
  size: "lg",
}
