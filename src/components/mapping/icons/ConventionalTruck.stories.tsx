import { Story } from "@storybook/react/types-6-0"
import conventionalTruckIcon from "../../../mapIcons/conventionalTruck.svg"

export default {
  title: "Mapping/Icons/ConventionalTruck",
}

const Template: Story = () => <img src={conventionalTruckIcon} alt="Conventional truck" />

export const Default = Template.bind({})
