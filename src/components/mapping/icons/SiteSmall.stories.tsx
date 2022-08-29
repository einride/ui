import { Story } from "@storybook/react/types-6-0"
import siteSmallIcon from "../../../mapIcons/siteSmall.svg"

export default {
  title: "Mapping/Icons/SiteSmall",
}

const Template: Story = () => <img src={siteSmallIcon} alt="Small site" />

export const Default = Template.bind({})
