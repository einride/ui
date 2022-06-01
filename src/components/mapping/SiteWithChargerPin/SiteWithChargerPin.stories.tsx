import { Story } from "@storybook/react/types-6-0"
import { SiteWithChargerPin, SiteWithChargerPinProps } from "./SiteWithChargerPin"

export default {
  title: "Mapping/SiteWithChargerPin",
  component: SiteWithChargerPin,
}

const Template: Story<SiteWithChargerPinProps> = (args) => <SiteWithChargerPin {...args} />

export const Default = Template.bind({})
Default.args = {
  size: "md",
}
