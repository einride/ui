import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Icon } from "../../../content/Icon/Icon"
import { SecondaryButton } from "./SecondaryButton"

export default {
  title: "Controls/Buttons/SecondaryButton",
  component: SecondaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof SecondaryButton>

const Template: ComponentStory<typeof SecondaryButton> = (args) => <SecondaryButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Button",
}

export const IconRight = Template.bind({})
IconRight.args = {
  ...Default.args,
  rightIcon: <Icon name="arrowRight" />,
}

export const IsLoading = Template.bind({})
IsLoading.args = {
  ...Default.args,
  isLoading: true,
}
