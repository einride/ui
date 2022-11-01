import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { Switch } from "./Switch"

export default {
  title: "Controls/Switches/Switch",
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Label",
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  "aria-label": "Label",
}

export const DefaultChecked = Template.bind({})
DefaultChecked.args = {
  ...Default.args,
  defaultChecked: true,
}

const ControlledTemplate: ComponentStory<typeof Switch> = (args) => {
  const [checked, setChecked] = useState(false)
  return <Switch checked={checked} onCheckedChange={setChecked} {...args} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...Default.args,
}
