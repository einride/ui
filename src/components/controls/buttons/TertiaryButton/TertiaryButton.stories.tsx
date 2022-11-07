import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Icon } from "../../../content/Icon/Icon"
import { TertiaryButton } from "./TertiaryButton"

export default {
  title: "Controls/Buttons/TertiaryButton",
  component: TertiaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof TertiaryButton>

const Template: ComponentStory<typeof TertiaryButton> = (args) => <TertiaryButton {...args} />

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
