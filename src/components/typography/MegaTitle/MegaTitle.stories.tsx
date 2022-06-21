import { Story } from "@storybook/react/types-6-0"
import { MegaTitle, MegaTitleProps } from "./MegaTitle"

export default {
  title: "Typography/MegaTitle",
  component: MegaTitle,
}

const Template: Story<MegaTitleProps> = (args) => <MegaTitle {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "A whole new way to ship.",
}
