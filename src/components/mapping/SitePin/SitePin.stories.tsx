import { ComponentMeta, ComponentStory } from "@storybook/react"
import { SitePin } from "./SitePin"

export default {
  title: "Mapping/SitePin",
  component: SitePin,
} as ComponentMeta<typeof SitePin>

const Template: ComponentStory<typeof SitePin> = (args) => <SitePin {...args} />

export const Default = Template.bind({})
Default.args = {
  size: "md",
}
