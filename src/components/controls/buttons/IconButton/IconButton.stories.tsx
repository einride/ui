import { ComponentMeta, ComponentStory } from "@storybook/react"
import { IconButton } from "./IconButton"

export default {
  title: "Controls/Buttons/IconButton",
  component: IconButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {}

export const AddButton = Template.bind({})
AddButton.args = {
  "aria-label": "Add vehicle",
  icon: "plus",
}
