import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Icon } from "../../../content/Icon/Icon"
import { PrimaryButton } from "./PrimaryButton"

export default {
  title: "Controls/Buttons/PrimaryButton",
  component: PrimaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof PrimaryButton>

const Template: ComponentStory<typeof PrimaryButton> = (args) => <PrimaryButton {...args} />

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
