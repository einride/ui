import { Story } from "@storybook/react/types-6-0"
import chargerSmallIcon from "./chargerSmall.svg"

export default {
  title: "Mapping/Icons/ChargerSmall",
}

const Template: Story = () => <img src={chargerSmallIcon} alt="Small charger" />

export const Default = Template.bind({})
