import { Story } from "@storybook/react/types-6-0"
import chargerIcon from "../../../mapIcons/charger.svg"

export default {
  title: "Mapping/Icons/Charger",
}

const Template: Story = () => <img src={chargerIcon} alt="Charger" />

export const Default = Template.bind({})
