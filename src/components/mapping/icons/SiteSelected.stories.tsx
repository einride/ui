import { Story } from "@storybook/react/types-6-0"
import siteIcon from "./siteSelected.svg"

export default {
  title: "Mapping/Icons/SiteSelected",
}

const Template: Story = () => <img src={siteIcon} alt="Site" />

export const Default = Template.bind({})
