import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Icon } from "../../content/Icon/Icon"
import { Option } from "./Option"

export default {
  title: "Menus/Option",
  component: Option,
} as ComponentMeta<typeof Option>

const Template: ComponentStory<typeof Option> = (args) => <Option {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: "Option",
  icon: <Icon name="arrowRight" />,
}

export const Selected = Template.bind({})
Selected.args = {
  ...Basic.args,
  selected: true,
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Basic.args,
  variant: "secondary",
}

export const SecondarySelected = Template.bind({})
SecondarySelected.args = {
  ...Secondary.args,
  selected: true,
}

export const AsButton = Template.bind({})
AsButton.args = {
  ...Basic.args,
  as: "button",
}
