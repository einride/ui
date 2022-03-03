import { Story } from "@storybook/react/types-6-0"
import { SitePin, SitePinProps } from "./SitePin"

export default {
  title: "Mapping/SitePin",
  component: SitePin,
}

const Template: Story<SitePinProps> = (args) => <SitePin {...args} />

export const Default = Template.bind({})
Default.args = {
  size: "md",
}
