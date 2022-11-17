import { expect } from "@storybook/jest"
import { Story } from "@storybook/react/types-6-0"
import { within } from "@storybook/testing-library"
import podIcon from "./pod.svg"

export default {
  title: "Mapping/Pod",
}

const Template: Story = () => <img src={podIcon} alt="Pod" />

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const img = canvas.getByRole("img")
  await expect(img).toHaveAccessibleName(/pod/i)
}
