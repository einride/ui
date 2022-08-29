import { Story } from "@storybook/react/types-6-0"
import siteWithChargerSmallIcon from "./siteWithChargerSmall.svg"

export default {
  title: "Mapping/Icons/SiteWithChargerSmall",
}

const Template: Story = () => <img src={siteWithChargerSmallIcon} alt="Small site with charger" />

export const Default = Template.bind({})
