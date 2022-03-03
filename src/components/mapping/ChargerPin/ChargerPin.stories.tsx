import { Story } from "@storybook/react/types-6-0"
import { ChargerPin, ChargerPinProps } from "./ChargerPin"

export default {
  title: "Mapping/ChargerPin",
  component: ChargerPin,
}

const Template: Story<ChargerPinProps> = (args) => <ChargerPin {...args} />

export const Default = Template.bind({})
Default.args = {
  size: "md",
}
