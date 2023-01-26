import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Icon } from "../../content/Icon/Icon"
import { MenuItem } from "./MenuItem"

export default {
  title: "Menus/MenuItem",
  component: MenuItem,
} as ComponentMeta<typeof MenuItem>

const Template: ComponentStory<typeof MenuItem> = (args) => (
  <MenuItem {...args} icon={<Icon name="arrowDownCircle" />}>
    Option 1
  </MenuItem>
)

export const Basic = Template.bind({})
Basic.args = {}

export const AsButton = Template.bind({})
AsButton.args = {
  as: "button",
}
