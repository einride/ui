import { Story } from "@storybook/react/types-6-0"
import podIcon from "./pod.svg"

export default {
  title: "Mapping/Icons/Pod",
}

const Template: Story = () => <img src={podIcon} alt="Pod" />

export const Default = Template.bind({})
