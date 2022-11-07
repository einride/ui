import { ComponentMeta, ComponentStory } from "@storybook/react"
import { SiteWithChargerPin } from "./SiteWithChargerPin"

export default {
  title: "Mapping/SiteWithChargerPin",
  component: SiteWithChargerPin,
} as ComponentMeta<typeof SiteWithChargerPin>

const Template: ComponentStory<typeof SiteWithChargerPin> = (args) => (
  <SiteWithChargerPin {...args} />
)

export const Default = Template.bind({})
Default.args = {
  size: "md",
}
