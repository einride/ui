import { Story } from "@storybook/react/types-6-0"
import siteWithChargerIcon from "./siteWithCharger.svg"

export default {
  title: "Mapping/Icons/SiteWithCharger",
}

const Template: Story = () => <img src={siteWithChargerIcon} alt="Site with charger" />

export const Default = Template.bind({})
