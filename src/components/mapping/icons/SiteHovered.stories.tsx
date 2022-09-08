import { Story } from "@storybook/react/types-6-0"
import siteIcon from "./siteHovered.svg"

export default {
  title: "Mapping/Icons/SiteHovered",
}

const Template: Story = () => <img src={siteIcon} alt="Site" />

export const Default = Template.bind({})
